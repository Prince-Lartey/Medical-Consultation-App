import Register from '@/components/Auth/Register'
import React from 'react'

export default function page({ params }: any }) {
    const { role, plan } = params;
    console.log(role, plan)

    return (
        <div className="">
            <Register role={role} plan={plan} />
        </div>
    ) 
}
