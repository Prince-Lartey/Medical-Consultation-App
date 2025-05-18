"use client"

import React from 'react'
import { useVideo } from "@100mslive/react-sdk"

interface PeerProps {
    peer: any
}

export default function Peer({ peer }: PeerProps) {
    const { videoRef } = useVideo({trackId: peer.videoTrack})
    const audioLevel = peer.audioLevel || 0 // Default to 0 if audio level is not available    
    // Calculate border color based on audio level
    const isAudioActive = audioLevel > 0.05

    return (
        <div className={`peer-container ${isAudioActive ? 'audio-active' : ''}`}>
            <video 
                ref={videoRef}
                className="peer-video"
                autoPlay
                muted={peer.isLocal}
                playsInline
            />
            <div className="peer-info">
                <div className="peer-name">
                    {peer.name} {peer.isLocal ? "(You)" : ""}
                </div>
            </div>
        </div>
    )
}