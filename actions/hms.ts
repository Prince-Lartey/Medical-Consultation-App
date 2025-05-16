"user server"

import jwt from "jsonwebtoken"

interface TokenData {
    roomId: string
    userName: string
    role: string
}

export async function generateSecureToken(data: TokenData) {
    const { roomId, userName, role } = data

    const secret = process.env.HMS_SECRET
    const apiKey = process.env.NEXT_PUBLIC_HSM_API_KEY

    if (!secret || !apiKey) {
        return {
            error: "Missing secret or API key",
            status: 500,
            token: null
        }
    }

    try {
        const token = jwt.sign(
            {
                access_key: apiKey,
                room_id: roomId,
                user_id: userName,
                role: role,
            },
            secret,
            {
                algorithm: "HS256",
                expiresIn: "24h",
            }
        )

        return {
            error: null,
            status: 200,
            token: token
        }
    } catch (error) {
        console.error("Error generating token:", error)
        return {
            error: "Failed to generate token",
            status: 500,
            token: null
        }
        
    }
}

