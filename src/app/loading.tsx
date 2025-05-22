"use client"

import dynamic from 'next/dynamic'
import healthLoader from '@/utils/healthLoader.json'

// Dynamically import the Player component with no SSR
const Player = dynamic(
    () => import('@lottiefiles/react-lottie-player').then((mod) => ({ default: mod.Player })),
    { 
        ssr: false,
        loading: () => (
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
            </div>
        )
    }
)

export default function Loader() {
    return (
        <div className="flex justify-center items-center h-screen">
            <Player
                autoplay
                loop
                src={healthLoader}
                style={{ height: '300px', width: '300px' }}
            />
        </div>
    )
}