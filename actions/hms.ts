"use server"

import jwt from "jsonwebtoken"
import { v4 as uuidv4 } from "uuid"

export interface TokenData {
    roomId: string
    userName: string
    role: string
}

const secret = process.env.HMS_SECRET
const apiKey = process.env.NEXT_PUBLIC_HSM_API_KEY

export async function generateSecureToken(data: TokenData) {
    const { roomId, userName, role } = data

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
                type: "app",
                jti: uuidv4(),
                iat: Math.floor(Date.now() / 1000),
            },
            secret,
            {
                algorithm: "HS256",
                expiresIn: "1h",
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

export async function createRoom(roomName: string) {
    // const secret = process.env.HMS_SECRET
    if (!secret || !apiKey) {
        return {
            error: "Missing secret or API key",
            status: 500,
            roomId: null
        }
    }

    try {
        const token = jwt.sign(
            {
                access_key: apiKey,
                type: "management",
                jti: uuidv4(),
            },
            secret,
            {
                algorithm: "HS256",
                expiresIn: "1h",
            }
        )
        const response = await fetch("https://api.100ms.live/v2/rooms", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                name: roomName,
                description: "Doctor-Patient Appointment Room",
                template_id: "6829e180d76db43de24eeae7"
            }),
        })

        const roomData = await response.json() 
        if (response.ok) {
            return {
                error: null,
                status: 200,
                roomId: roomData.id
            }
        } else {
            return {
                error: roomData.error,
                status: response.status,
                roomId: null
            }
        }
    } catch (error) {
        console.error("Error creating room:", error)
        return {
            error: "Failed to create room",
            status: 500,
            roomId: null
        }
        
    }
}