import React from 'react'
import SectionHeading from './SectionHeading'
import ToggleButton from './ToggleButton'
import Link from 'next/link'
import { Map } from 'lucide-react'
import DoctorListCarousel from './DoctorListCarousel'

export default function DoctorList({
    title="Telehealth Visit", 
    isInPerson, 
    className="bg-white py-8 lg:py-24"
}: { 
    title?: string; 
    isInPerson?: boolean; 
    className?: string 
}) {

    const doctors = [
        {
            name: "Prince"
        },
        {
            name: "Prince"
        },
        {
            name: "Prince"
        },
        {
            name: "Prince"
        },
        {
            name: "Prince"
        },
        {
            name: "Prince"
        },
        {
            name: "Prince"
        },
    ]

    return (
        <div className={className}>
            <div className="max-w-6xl mx-auto">
                <SectionHeading title={title}/>
                <div className="py-4 flex items-center justify-between">
                    {
                        isInPerson ? (
                            <Link href="#" className="text-blue-500 font-semibold text-sm flex items-center">
                                <Map className="mr-2 flex-shrink-0 w-4 h-4"/>
                                <span>Map View</span>
                            </Link>
                        ) : (
                            <ToggleButton />
                        )
                    }
                    <Link href="#" className="py-3 px-6 border border-blue-950 bg-gray-50 hover:bg-blue-950 hover:text-gray-50 hover:border-gray-50">See All</Link>
                </div>
                <div className="py-6">
                    <DoctorListCarousel doctors={doctors} isInPerson={isInPerson} />
                </div>
            </div>
        </div>
    )
}
