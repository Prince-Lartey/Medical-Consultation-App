import Register from '@/components/Auth/Register'
import React from 'react'

export default async function page({ searchParams }: { searchParams: Promise<{ [key: string]: string | string[] | undefined }>;}) {
    const resolvedSearchParams = await searchParams;
    const role = resolvedSearchParams.role || "USER" as string;
    const plan = resolvedSearchParams.plan || "" as string;

    console.log(role, plan)

    return (
        <div className="">
            <Register role={role} plan={plan} />
        </div>
    ) 
}
