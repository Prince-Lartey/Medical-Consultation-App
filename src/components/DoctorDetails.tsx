"use client"

import React, { useState } from 'react'
import { DoctorDetail } from '../../types/types'
import { Button } from './ui/button'
import { Calendar } from './ui/calendar'
import getFormattedLongDate from '@/utils/getFormattedLongDate'
import { getDayFromDate } from '@/utils/getDayFromDate'
import { MoveRight } from 'lucide-react'

export default function DoctorDetails({doctor}: {doctor: DoctorDetail}) {
    const [isActive, setIsActive] = useState("availability")
    const [date, setDate] = useState<Date | undefined>(new Date())
    const day = getDayFromDate(date?.toDateString())

    const formattedDate = getFormattedLongDate(date!.toDateString())    
    const isAvailableDoctors = doctor.doctorProfile?.availability?.[day] ?? null
    const [selectedTime, setSelectedTime] = useState("")

    return (
        <div>
            <div className="flex items-center justify-between">
                <button onClick={() =>setIsActive("details")} className={isActive==="details" ? "py-4 px-8 bg-blue-950 text-white w-full uppercase tracking-widest" : "py-4 px-8 bg-gray-100 text-blue-950 w-full uppercase tracking-widest"}>Service Details</button>
                <button onClick={() =>setIsActive("availability")} className={isActive==="availability" ? "py-4 px-8 bg-blue-950 text-white w-full uppercase tracking-widest" : "py-4 px-8 bg-gray-100 text-blue-950 w-full uppercase tracking-widest"}>Availability</button>
            </div>
            <div className='py-8 px-6'>
                {isActive==="availability" ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="">
                            <Calendar
                                mode="single"
                                selected={date}
                                onSelect={setDate}
                                className="rounded-md border shadow"
                            />
                        </div>
                        <div className="">
                            <span className="text-blue-600 text-sm">You&apos;ve selected</span>
                            <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">{formattedDate}</h2>
                            {isAvailableDoctors && isAvailableDoctors.length > 0 ? (
                                <div className="py-3 grid grid-cols-4 gap-4">
                                    {isAvailableDoctors.map((item, index) => {
                                        return (
                                            <Button key={index} variant={selectedTime === item ? "default" : "outline"} onClick={() => setSelectedTime(item)}>{item}</Button>
                                        )
                                    })}
                                </div>
                                ) : (
                                <div className="py-3 text-center">
                                    <p className="text-gray-600 dark:text-gray-400">No availability for today</p>
                                </div>
                            )}
                            <div className="py-2">
                                <button type="button" className="text-white bg-blue-600 hover:bg-blue-600/80 focus:ring-4 focus:outline-none focus:ring-blue-600/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:hover:bg-blue-600/80 dark:focus:ring-blue-600/40 me-2 mb-2">
                                    Book Doctor (GHS {doctor.doctorProfile?.hourlyWage})
                                    <MoveRight className="w-6 h-6 ml-3" />
                                </button>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div>
                        Service Details Components
                    </div>
                )}
            </div>
        </div>
    )
}
