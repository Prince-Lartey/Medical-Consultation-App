import Register from '@/components/Auth/Register'
import React from 'react'

export default function page({ searchParams } : { searchParams: { [key: string]: string | string[] | undefined } }) {
    const { role, plan } = searchParams;
    console.log(role, plan)

    return (
        <div className="">
            <Register role={role} plan={plan} />
        </div>
    ) 
}
