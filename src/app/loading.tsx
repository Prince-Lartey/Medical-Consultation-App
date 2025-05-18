"use client"

import { Player } from '@lottiefiles/react-lottie-player'
import healthLoader from '@/utils/healthLoader.json'

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