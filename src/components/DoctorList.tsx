import React from 'react'
import SectionHeading from './SectionHeading'
import ToggleButton from './ToggleButton'
import Link from 'next/link'
import { ArrowUpRight, Map } from 'lucide-react'
import DoctorListCarousel from './DoctorListCarousel'
import { Button } from './ui/button'
import { Doctor } from '../../types/types'

export default function DoctorList({
    title="Telehealth Visit", 
    isInPerson, 
    className="bg-white dark:bg-gray-400 py-8 lg:py-24",
    doctors
}: { 
    title?: string; 
    isInPerson?: boolean; 
    className?: string
    doctors: Doctor[]
}) {

    // const doctors = [
    //     {
    //         name: "Prince"
    //     },
    //     {
    //         name: "Prince"
    //     },
    //     {
    //         name: "Prince"
    //     },
    //     {
    //         name: "Prince"
    //     },
    //     {
    //         name: "Prince"
    //     },
    //     {
    //         name: "Prince"
    //     },
    //     {
    //         name: "Prince"
    //     },
    // ]

    return (
        <div className={className}>
            <div className="max-w-6xl mx-auto">
                <SectionHeading title={title}/>
                <div className="py-4 flex items-center justify-between">
                    {
                        isInPerson ? (
                            <Link href={`/category?mode=${title}`} className="text-blue-500 font-semibold text-sm flex items-center">
                                <Map className="mr-2 flex-shrink-0 w-4 h-4"/>
                                <span>Map View</span>
                            </Link>
                        ) : (
                            <ToggleButton />
                        )
                    }
                    <Button asChild>
                        <Link href={`/category?mode=${title}`} className="">
                            See All
                            <ArrowUpRight className="h-4 w-4 ms-2"/>
                        </Link>
                    </Button>
                </div>
                <div className="py-6">
                    <DoctorListCarousel doctors={doctors} isInPerson={isInPerson} />
                </div>
            </div>
        </div>
    )
}
