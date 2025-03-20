import React from 'react'

export default function page({params: {id}} : {params: {id: string}}) {
    return (
        <div>
            <div className="max-w-5xl mx-auto py-8 min-h-screen">
                <h2>Wecome Doctor - {id}</h2>
            </div>
        </div>
    )
}
