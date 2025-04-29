import OnboardingSteps from '@/components/Onboarding/OnboardingSteps'
import React from 'react'
import { getSpecialties } from '../../../../../actions/specialties';

export default async function page({params} : {params: Promise<{ id: string }>;}) {
    const { id } = await params

    const specialties = (await getSpecialties()).data || []

    return (
        <div className="bg-cyan-800 dark:bg-slate-800">
            <div className="max-w-5xl mx-auto py-8 min-h-screen">
                <h2>Welcome Doctor - {id}</h2>
                <OnboardingSteps id={id} specialties={specialties}/>
            </div>
        </div>
    )
}
