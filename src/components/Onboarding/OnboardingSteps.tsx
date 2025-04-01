"use client"

import { cn } from '@/lib/utils'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import React from 'react'
import BioDataForm from './BioDataForm'
import ContactInfo from './ContactInfo'
import ProfessionInfo from './ProfessionInfo'
import ProfileInfoForm from './ProfileInfoForm'
import EducationInfo from './EducationInfo'
import PracticeInfo from './PracticeInfo'

export default function OnboardingSteps({id}: {id: string}) {
    const params = useSearchParams()
    const page = params.get('page') ?? "bio-data"

    const steps = [
        {
            title: 'Bio Data',
            page: 'bio-data',
            component: <BioDataForm title="Bio Data" description="Please fill in your Bio details" page={page} />,
        },
        {
            title: 'Profile Information',
            page: 'profile',
            component: <ProfileInfoForm title="Profile Information" description="Please fill in your profile details" page={page} />,
        },
        {
            title: 'Contact Information',
            page: 'contact',
            component: <ContactInfo title="Contact Information" description="Please fill in your contact details" page={page} />,
        },
        {
            title: 'Professional Information',
            page: 'profession',
            component: <ProfessionInfo title="Professional Information" description="Please fill in your profession details" page={page}/>
        },
        {
            title: 'Education Information',
            page: 'education',
            component: <EducationInfo title="Academic Information" description="Please fill in your academic details" page={page}/>
        },
        {
            title: 'Practice Information',
            page: 'practice',
            component: <PracticeInfo title="Practice Information" description="Please fill in your practice details" page={page}/>
        },
        {
            title: 'Additional Information',
            page: 'additional',
            component: <></>
        },
        {
            title: 'Availability',
            page: 'availability',
            component: <></>
        },
    ]
    const currentStep = steps.find((step) => step.page === page)

    return (
        <div className="grid grid-cols-12 mx-auto rounded-sm shadow-inner overflow-hidden border border-slate-200 min-h-screen bg-gray-100 h-full">
            <div className='col-span-full sm:col-span-3 divide-y-2 divide-gray-200'>
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
            <div className='col-span-full sm:col-span-9 bg-gray-100 p-4'>
                {currentStep?.component}
            </div>
        </div>
    )
}
