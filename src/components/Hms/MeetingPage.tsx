import { selectIsConnectedToRoom, useHMSActions, useHMSStore } from '@100mslive/react-sdk'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

export default function MeetingPage({roomId}: {roomId: string}) {
    const router = useRouter()
    const {roomId} = router.query
    const hmsActions = useHMSActions()
    const isConnected = useHMSStore(selectIsConnectedToRoom)
    const [token, setToken] = useState<string | null>(null)

    useEffect(() => {
        const fetchToken = async () => {
            const response = await fetch('/api/hms/token', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ roomId })
            })

            const data = await response.json()
            if (data.token) {
                setToken(data.token)
            }
        }
        fetchToken()
    }, [roomId])

    useEffect(() => {
        if (token && !isConnected) {
            hmsActions.join({
                userName: 'Doctor',
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
