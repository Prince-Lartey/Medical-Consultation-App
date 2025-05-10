import Link from 'next/link'
import React from 'react'
import { specialtyDataProps, getDoctorsBySpecialtySlug } from '../../../../../actions/doctors'
import DoctorCard from '@/components/DoctorCard'
import { Doctor } from '../../../../../types/types'

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params

    const title = slug.split('-').join(" ")

    const data =  await getDoctorsBySpecialtySlug(slug) as specialtyDataProps
    const doctors = data?.doctors as Doctor[]
    const specialties = data?.specialties

    return (
        <div className="container p-8">
            <h1 className="capitalize scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-4xl pb-6">{title} ({doctors.length.toString().padStart(2, "0")})</h1>
            <div className="max-w-6xl mx-auto grid grid-cols-12 gap-6 lg:gap-10">
                <div className="col-span-3 border border-gray-200/50 rounded-sm p-6">
                    <h2 className="capitalize font-semibold">Other Specialties</h2>
                    {
                        specialties?.length > 0 && (
                            <div className="py-3 flex flex-col text-sm space-y-2">
                                {
                                    specialties.map((specialty, i) => {
                                        return (
                                            <Link key={i} href={`/specialty/${specialty.slug}`} className="hover:text-blue-600">{specialty.title}</Link>
                                        )
                                    })
                                }
                            </div>
                        )
                    }
                </div>
                <div className="col-span-9">
                    {
                        doctors.length > 0 ? (
                            <div className="grid grid-cols-2 gap-6">
                                {doctors.map((doctor: Doctor) => {
                                    return (
                                        <DoctorCard key={doctor.id} doctor={doctor}/>
                                    )
                                })}
                            </div>
                        ) : (
                            <h2>No doctors found for this specialty.</h2>
                        )
                    }
                </div>
            </div>
        </div>
    )
}
