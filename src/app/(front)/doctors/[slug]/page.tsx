import DoctorDetails from '@/components/DoctorDetails'
import Image from 'next/image'
import React from 'react'
import { getDoctorBySlug } from '../../../../../actions/users'
import Link from 'next/link'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { getFirstPatientAppointmentsById } from '../../../../../actions/appointments'

export default async function page({params}: {params: Promise<{ slug: string }>;}) {
    const { slug } = await params

    const doctor = await getDoctorBySlug(slug)
    const session = await getServerSession(authOptions)
    const user = session?.user

    const appointment = await getFirstPatientAppointmentsById(user?.id)

    return (
        <>
            {
                doctor && doctor.id ? (
                    <div className="bg-slate-50 py-8 min-h-screen dark:bg-slate-800">
                        <div className="max-w-4xl border border-gray-200 dark:border-gray-600 mx-auto bg-white dark:bg-slate-950 shadow-md rounded-md">
                            <div className="py-6 px-8">
                                <div className="flex items-center justify-between">
                                    <div className="">
                                        <div className="flex flex-col">
                                            <h2 className='uppercase font-bold text-2xl track-widest'>{doctor.name}</h2>
                                            <p className="text-gray-500 text-xs uppercase">Adult Health</p>
                                        </div>
                                        <div className="py-3">
                                            <p>{doctor.doctorProfile?.operationMode}</p>
                                            <p>{doctor.doctorProfile.region}, {doctor.doctorProfile.city}</p>
                                        </div>
                                    </div>
                                    <Image src={doctor.doctorProfile?.profilePicture ?? "/doctor.jpg"} width={512} height={512} alt="Doctor" className="w-36 h-36 rounded-md object-cover mr-2" />
                                </div>
                            </div>
                            <div className="">
                                <DoctorDetails doctor={doctor} appointment={appointment}/>
                            </div>
                        </div>

                        {/* <FixedBookButton doctor={doctor}/> */}
                    </div>
                ) : (
                    <div className="bg-slate-50 dark:bg-slate-900 py-16 min-h-screen flex items-center justify-center">
                        <div className="max-w-xl w-full bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 shadow-xl rounded-2xl p-10 text-center space-y-6">
                            <div className="flex justify-center">
                                <svg className="w-16 h-16 text-red-500" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01M4.93 4.93l14.14 14.14M19.07 4.93L4.93 19.07" />
                                </svg>
                            </div>
                            <h2 className="text-3xl font-extrabold tracking-tight text-slate-800 dark:text-white uppercase">Doctor Not Found</h2>
                            <p className="text-gray-600 dark:text-gray-300 text-base">
                                We couldn&apos;t locate the doctor you&apos;re looking for. They may not be available to work today.
                            </p>
                            <div>
                                <Link href="/" className="inline-block px-6 py-3 text-sm font-medium text-white bg-blue-600 rounded-full hover:bg-blue-700 transition">
                                    Go Back to HomePage
                                </Link>
                            </div>
                        </div>
                    </div>
                )
            }
        </>
    )
}
