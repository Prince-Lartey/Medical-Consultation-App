import OnboardingSteps from '@/components/Onboarding/OnboardingSteps'
import React from 'react'

export default async function page({params} : {params: Promise<{ id: string }>;}) {
    const { id } = await params

    return (
        <div className="bg-cyan-800 dark:bg-slate-800">
            <div className="max-w-5xl mx-auto py-8 min-h-screen">
                <h2>Welcome Doctor - {id}</h2>
                <OnboardingSteps />
            </div>
        </div>
    )
}
