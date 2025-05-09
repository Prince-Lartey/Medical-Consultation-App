import { Stethoscope, Video } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Doctor, DoctorProfileAvailabilty } from '../../types/types'
import getFormattedDate from '@/utils/getFormattedDate'
import { getDayName } from '@/utils/getDayName'

export default function DoctorCard({ isInPerson = false, doctor }: { isInPerson?: boolean, doctor: Doctor }) {
    const formattedDate = getFormattedDate()    
    const today: keyof DoctorProfileAvailabilty = getDayName()
    const isAvailableDoctors = doctor.doctorProfile?.availability?.[today] ?? []

    const slug = doctor.slug

    return (
        <>
            {
                isAvailableDoctors.length > 0 && (
                    <div className="border border-gray-200 dark:border-gray-600 py-8 px-6 inline-flex flex-col bg-white dark:bg-slate-800 hover:border-gray-400 duration-300 transition-all">
                        <Link href={`/doctors/${slug}`}>
                            <h2 className='uppercase font-bold text-2xl track-widest'>{doctor.name}</h2>
                            { isInPerson && <p className="py-3">{doctor.doctorProfile?.hospitalAddress}</p>}
                            <div className="flex items-center gap-4 py-4">
                                <div className="relative">
                                    <Image src={doctor.doctorProfile?.profilePicture ?? "/doctor.jpg"} width={512} height={512} alt={doctor.name} className="w-24 h-24 rounded-full object-cover mr-2" />
                                    {
                                        !isInPerson && <p className="absolute bottom-0 right-1 bg-blue-200 w-10 h-10 flex items-center justify-center rounded-full text-blue-700">
                                        <Video className="w-6 h-6"/>
                                    </p>
                                    }
                                    
                                </div>
                                <div className="flex flex-col gap-2">
                                    <p className="flex items-center">
                                        <Stethoscope className="w-4 h-4 mr-2 flex-shrink-0"/> 
                                        <span>Family Medicine</span>
                                    </p>
                                    <p className="bg-green-400 py-3 px-6 uppercase text-sm">Available Today</p>
                                </div>
                            </div>
                        </Link>

                        <div className="pt-6 border-t border-gray-400">
                            <h3 className="flex gap-4 justify-between items-center">
                                <span className="text-gray-600 dark:text-gray-400">{formattedDate}</span> <span className="font-bold">GHS {doctor.doctorProfile?.hourlyWage}</span>
                            </h3>
                            <div className="py-3 grid grid-cols-3 gap-4">
                                {isAvailableDoctors.slice(0, 5).map((item, index) => {
                                    return (
                                        <Link href={`/doctors/${slug}`} key={index} className="bg-blue-950 text-white p-2 rounded-lg text-center text-sm">
                                            {item}
                                        </Link>
                                    )
                                })}
                                {isAvailableDoctors.length > 5 && (
                                    <Link href={`/doctors/${slug}`} className="bg-gray-200 text-blue-950 p-2 rounded-lg text-center text-sm truncate">
                                        More times
                                    </Link>
                                )}
                            </div>
                        </div>
                    </div>
                )
            }
        </>
    )
}
