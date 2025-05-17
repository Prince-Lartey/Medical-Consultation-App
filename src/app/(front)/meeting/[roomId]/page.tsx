import React from 'react'

export default function page({params} : {params: Promise<{ roomId: string }>;}) {
    const {roomId} = await params
    
    return (
        <div>page</div>
    )
}
