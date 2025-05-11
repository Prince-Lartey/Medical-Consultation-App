import Link from 'next/link'
import React from 'react'
import { symptomDataProps, getDoctorsBySymptomId } from '../../../../../actions/doctors'
import DoctorCard from '@/components/DoctorCard'
import { Doctor } from '../../../../../types/types'

export default async function Page({ params, searchParams }: { params: Promise<{ slug: string }>, searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) {
    const { slug } = await params
    const resolvedSearchParams = await searchParams;
    const id = resolvedSearchParams.id as string;

    const title = slug.split('-').join(" ")

    const data =  await getDoctorsBySymptomId(id) as symptomDataProps
    const doctors = data?.doctors as Doctor[]
    const symptoms = data?.symptoms

    return (
        <div className="container p-8">
            <h1 className="capitalize scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-4xl pb-6">{title} ({doctors.length.toString().padStart(2, "0")})</h1>
            <div className="max-w-6xl mx-auto grid grid-cols-12 gap-6 lg:gap-10">
                <div className="col-span-3 border border-gray-200/50 rounded-sm p-6">
                    <h2 className="capitalize font-semibold">Other Symptoms</h2>
                    {
                        symptoms?.length > 0 && (
                            <div className="py-3 flex flex-col text-sm space-y-2">
                                {
                                    symptoms.map((symptom, i) => {
                                        return (
                                            <Link key={i} href={`/symptoms/${symptom.slug}?id=${symptom.id}`} className="hover:text-blue-600">{symptom.title}</Link>
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
                            <h2>No doctors found for this symptom.</h2>
                        )
                    }
                </div>
            </div>
        </div>
    )
}
