import Register from '@/components/Auth/Register'
import React from 'react'

export default async function page({params}: {params: Promise<{ role: string, plan: string }>;}) {
    const { role, plan } = await params;
    console.log(role, plan)

    return (
        <div className="">
            <Register role={role} plan={plan} />
        </div>
    ) 
}
