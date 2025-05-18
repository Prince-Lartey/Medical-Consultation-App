"use client"

import { selectIsConnectedToRoom, selectPeers, useHMSActions, useHMSStore } from '@100mslive/react-sdk'
import { Session } from 'next-auth'
import React, { useEffect, useState } from 'react'
import { generateSecureToken, TokenData } from '../../../actions/hms'
import Peer from './Peer'
import { Mic, MicOff, Video, VideoOff, PhoneOff } from 'lucide-react'
import PrescriptionPanel from './PrescriptionPanel'
import {useRouter} from "next/navigation"

export default function MeetingPage({roomId, session}: {roomId: string, session: Session}) {
    const user = session.user
    const role = user.role
    const username = role === "DOCTOR" ? `Dr. ${user.name?.split(" ")[0]}` : user.name?.split(" ")[0]
    const hmsActions = useHMSActions()
    const isConnected = useHMSStore(selectIsConnectedToRoom)
    const peers = useHMSStore(selectPeers)
    const [token, setToken] = useState<string | null>(null)
    const [isMicOn, setIsMicOn] = useState(true)
    const [isVideoOn, setIsVideoOn] = useState(true)
    const router = useRouter()

    useEffect(() => {
        const fetchToken = async () => {
            try {
                const tokenData: TokenData = {
                    roomId,
                    role: role === "DOCTOR" ? "host" : "guest",
                    userName: username || ""
                }
                const data = await generateSecureToken(tokenData)

                if (data.token) {
                    setToken(data.token)
                }else {
                    console.error("Failed to retrieve token:", data.error)
                }
            }catch (error) {
                console.error("Error fetching token:", error)
            }
        }
        
        if(typeof window !== "undefined") {
            fetchToken()
        }
    }, [roomId, role, username])

    useEffect(() => {
        const joinRoom = async () => {
            try {
                if (token && !isConnected) {
                    await hmsActions.join({
                        userName: username || "",
                        authToken: token,
                    })
                }
            } catch (error) {
                console.error("Error joining room:", error)
            }
        }
    
        if(token && typeof window !== "undefined") {
            joinRoom()
        }
        
    }, [token, isConnected, hmsActions, username])

    const toggleMic = async () => {
        try {
            await hmsActions.setLocalAudioEnabled(!isMicOn)
            setIsMicOn(!isMicOn)
        } catch (error) {
            console.error("Error toggling microphone:", error)
        }
    }

    const toggleVideo = async () => {
        try {
            await hmsActions.setLocalVideoEnabled(!isVideoOn)
            setIsVideoOn(!isVideoOn)
        } catch (error) {
            console.error("Error toggling video:", error)
        }
    }

    const leaveRoom = async () => {
        try {
            await hmsActions.leave()
            router.push("/dashboard")

        } catch (error) {
            console.error("Error leaving room:", error)
        }
    }

    return (
        <div className="flex flex-col min-h-screen bg-gray-900 text-white">
            {isConnected ? (
                <div className="flex flex-1 overflow-hidden">
                    {/* Video Grid Area */}
                    <div className="flex-1 p-4">
                        <div className="video-container">
                            {peers.map((peer: any) => (
                                <Peer key={peer.id} peer={peer} />
                            ))}
                        </div>
                        
                        {/* Controls */}
                        <div className="controls-container">
                            <button 
                                onClick={toggleMic} 
                                className={`control-button ${!isMicOn ? 'control-off' : ''}`}
                            >
                                {isMicOn ? <Mic size={24} /> : <MicOff size={24} />}
                            </button>
                            
                            <button 
                                onClick={toggleVideo} 
                                className={`control-button ${!isVideoOn ? 'control-off' : ''}`}
                            >
                                {isVideoOn ? <Video size={24} /> : <VideoOff size={24} />}
                            </button>
                            
                            <button 
                                onClick={leaveRoom} 
                                className="control-button end-call"
                            >
                                <PhoneOff size={24} />
                            </button>
                        </div>
                    </div>
                    
                    {/* Prescription Panel - Only show for doctor or if prescription is shared with patient */}
                    
                    <PrescriptionPanel roomId={roomId} isDoctor={role === "DOCTOR" || role === "USER"} />
                    
                </div>
            ) : token ? (
                <div className="flex flex-col items-center justify-center flex-1 p-8">
                    <div className="loading-spinner mb-4"></div>
                    <h1 className="text-xl font-semibold">Connecting to Room...</h1>
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center flex-1 p-8">
                    <div className="loading-spinner mb-4"></div>
                    <p className="text-lg">Generating token and preparing room...</p>
                </div>
            )}
        </div>
    )
}