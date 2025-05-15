import OnboardingSteps from '@/components/Onboarding/OnboardingSteps'
import React from 'react'
import { getSpecialties } from '../../../../../actions/specialties';
// import { getDoctorProfileById } from '../../../../../actions/onboarding';

export default async function page({params} : {params: Promise<{ id: string }>;}) {
    const { id } = await params

    const specialties = (await getSpecialties()).data || []
    // const doctorProfile = (await getDoctorProfileById(id))?.data

    return (
        <div className="bg-cyan-800 dark:bg-slate-800">
            <div className="max-w-5xl mx-auto py-8 min-h-screen">
                <OnboardingSteps id={id} specialties={specialties} />
            </div>
        </div>
    )
}
