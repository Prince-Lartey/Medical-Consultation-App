import React from 'react'
import SectionHeading from './SectionHeading'
import ToggleButton from './ToggleButton'
import Link from 'next/link'

export default function DoctorList() {
    return (
        <div className="bg-slate-200 py-8 lg:py-24">
            <div className="max-w-6xl mx-auto">
                <SectionHeading title='Telehealth Visit'/>
                <div className="py-4 flex items-center justify-between">
                    <ToggleButton />
                    <Link href="#" className="py-3 px-6 border border-blue-950 bg-gray-50 hover:bg-blue-950 hover:text-gray-50 hover:border-gray-50">See All</Link>
                </div>
            </div>
        </div>
    )
}
