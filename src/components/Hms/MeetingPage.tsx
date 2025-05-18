import { selectIsConnectedToRoom, useHMSActions, useHMSStore } from '@100mslive/react-sdk'
import { Session } from 'next-auth'
import React, { useEffect, useState } from 'react'
import { generateSecureToken, TokenData } from '../../../actions/hms'

export default function MeetingPage({roomId, session}: {roomId: string, session: Session}) {
    const user = session.user
    const role = user.role
    const username = role === "DOCTOR" ? `Dr. ${user.name?.split(" ")[0]}` : user.name?.split(" ")[0]
    const hmsActions = useHMSActions()
    const isConnected = useHMSStore(selectIsConnectedToRoom)
    const [token, setToken] = useState<string | null>(null)

    useEffect(() => {
        const fetchToken = async () => {
            const tokenData: TokenData = {
                roomId,
                role: role === "DOCTOR" ? "host" : "guest",
                userName: username || ""
            }
            const data = await generateSecureToken(tokenData)

            if (data.token) {
                setToken(data.token)
            }
        }
        fetchToken()
    }, [roomId])

    useEffect(() => {
        if (token && !isConnected) {
            hmsActions.join({
                userName: username || "",
                authToken: token,
            })
        }
    }, [token, isConnected, hmsActions])

    return (
        <div>
            {isConnected ? (
                <div>
                    <h1>Connected to Room: {roomId}</h1>
                    {/* Add your meeting UI here */}
                </div>
            ) : (
                <div>
                    <h1>Connecting to Room...</h1>
                    {/* Add your loading UI here */}
                </div>
            )}
        </div>
    )
}
