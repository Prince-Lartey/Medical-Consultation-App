import { cn } from '@/lib/utils'
import Link from 'next/link'
import React from 'react'

export default function OnboardingSteps() {
    const steps = [
        {
            title: 'Bio Data',
            page: 'bio-data',
        },
        {
            title: 'Contact Information',
            page: 'contact',
        },
        {
            title: 'Profession Information',
            page: 'profession',
        },
        {
            title: 'Education Information',
            page: 'education',
        },
        {
            title: 'Practice Information',
            page: 'practice',
        },
        {
            title: 'Additional Information',
            page: 'additional',
        },
        {
            title: 'Availability',
            page: 'availability',
        },
    ]
    return (
        <div className="grid grid-cols-12 mx-auto rounded-sm shadow-inner overflow-hidden border border-slate-200 min-h-screen bg-gray-100">
            <div className='col-span-full sm:col-span-3 divide-y-2 divide-gray-200'>
                <Link href="#" className="block py-3 px-4 bg-cyan-900 text-gray-100 shadow-inner uppercase text-sm">Contact Information</Link>
                {
                    steps.map((step, index) => {
                        return (
                            <Link key={index} href="#" className={cn("block py-3 px-4 bg-gray-400 text-gray-800 shadow-inner text-sm uppercase", step.page === page ? "bg-cyan-900 text-gray-100" : "")}>{step.title}</Link>
                        )
                    })
                }
            </div>
            <div className='col-span-full sm:col-span-9 bg-gray-100 p-4'>
                <div>2</div>
                <div>2</div>
                <div>2</div>
                <div>2</div>
                <div>2</div>
            </div>
        </div>
    )
}
