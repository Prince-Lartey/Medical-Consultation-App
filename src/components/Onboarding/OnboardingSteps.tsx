"use client"

import { cn } from '@/lib/utils'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import React from 'react'
import BioDataForm from './BioDataForm'
import ContactInfo from './ContactInfo'
import ProfileInfoForm from './ProfileInfoForm'
import EducationInfo from './EducationInfo'
import PracticeInfo from './PracticeInfo'
import AdditionalInfo from './AdditionalInfo'
import { useOnboardingContext } from '@/context/context'
import { Specialty } from '@prisma/client'

export default function OnboardingSteps({id, specialties}: {id: string, specialties: Specialty[]}) {
    const params = useSearchParams()
    const page = params.get('page') ?? "bio-data"
    const { trackingNumber, doctorProfileId, savedDBData } = useOnboardingContext()

    const steps = [
        {
            title: 'Bio Data',
            page: 'bio-data',
            component: <BioDataForm title="Bio Data" description="Please fill in your Bio details" page={page} userId={id} nextPage="profile" formId={doctorProfileId?doctorProfileId:savedDBData.id}/>,
        },
        {
            title: 'Profile Information',
            page: 'profile',
            component: <ProfileInfoForm title="Profile Information" description="Please fill in your profile details" page={page} userId={id} nextPage="contact" formId={doctorProfileId?doctorProfileId:savedDBData.id}/>,
        },
        {
            title: 'Contact Information',
            page: 'contact',
            component: <ContactInfo title="Contact Information" description="Please fill in your contact details" page={page} userId={id} nextPage="education" formId={doctorProfileId?doctorProfileId:savedDBData.id}/>,
        },
        {
            title: 'Education Information',
            page: 'education',
            component: <EducationInfo title="Academic Information" description="Please fill in your academic details" page={page} userId={id} nextPage="practice" formId={doctorProfileId?doctorProfileId:savedDBData.id} specialties={specialties}/>
        },
        {
            title: 'Practice Information',
            page: 'practice',
            component: <PracticeInfo title="Practice Information" description="Please fill in your practice details" page={page} userId={id} nextPage="additional" formId={doctorProfileId?doctorProfileId:savedDBData.id}/>
        },
        {
            title: 'Additional Information',
            page: 'additional',
            component: <AdditionalInfo title="Additional Information" description="Please fill in your additional details" page={page} userId={id} nextPage="final" formId={doctorProfileId?doctorProfileId:savedDBData.id}/>
        },
        // {
        //     title: 'Availability',
        //     page: 'availability',
        //     component: <Availability title="Availability Information" description="Please provide your availability details" page={page} userId={id} formId={doctorProfileId}/>
        // },
    ]
    const currentStep = steps.find((step) => step.page === page)

    return (
        <div className="grid grid-cols-12 mx-auto rounded-sm shadow-inner border border-slate-200 dark:border-slate-500 min-h-screen bg-gray-300 dark:bg-slate-950">
            <div className='col-span-full sm:col-span-3 divide-y-2 divide-gray-200 h-full bg-gray-300 dark:bg-slate-900'>
                {
                    steps.map((step, index) => {
                        return (
                            <Link 
                                key={index} 
                                href={`/onboarding/${id}?page=${step.page}`}
                                className={cn("block py-3 px-4 bg-gray-300 text-gray-800 shadow-inner text-sm uppercase", step.page === page ? "bg-cyan-900 text-gray-100" : "")}
                            >
                                {step.title}
                            </Link>
                        )
                    })
                }
            </div>
            <div className='col-span-full sm:col-span-9 bg-gray-100 p-4 dark:bg-slate-950'>
                {
                    trackingNumber || (savedDBData.trackingNumber && 
                    <p className="border-b border-gray-200 dark:border-slate-600 text-cyan-700 dark:text-cyan-400 pb-2">Your Tracking Number is <span className="font-bold">{trackingNumber ? trackingNumber : savedDBData.trackingNumber}</span>{" "}<span className="text-xs">(Use this to check the status or resume application)</span></p>
                )}
                {currentStep?.component}
            </div>
        </div>
    )
}
