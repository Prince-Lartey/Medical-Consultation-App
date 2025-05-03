"use client"

import React, { useState } from 'react'
import Availability from './Availability'
import { DoctorDetail, DoctorProfileAvailabilty } from '../../types/types'
import getFormattedDate from '@/utils/getFormattedDate'
import { getDayName } from '@/utils/getDayName'
import { Button } from './ui/button'

export default function DoctorDetails({doctor}: {doctor: DoctorDetail}) {
    const [isActive, setIsActive] = useState("availability")

    const formattedDate = getFormattedDate()    
    const today: keyof DoctorProfileAvailabilty = getDayName()
    const isAvailableDoctors = doctor.doctorProfile?.availability?.[today] ?? null
    const [selectedTime, setSelectedTime] = useState("")

    return (
        <div>
            <div className="flex items-center justify-between">
                <button onClick={() =>setIsActive("details")} className={isActive==="details" ? "py-4 px-8 bg-blue-950 text-white w-full uppercase tracking-widest" : "py-4 px-8 bg-gray-100 text-blue-950 w-full uppercase tracking-widest"}>Service Details</button>
                <button onClick={() =>setIsActive("availability")} className={isActive==="availability" ? "py-4 px-8 bg-blue-950 text-white w-full uppercase tracking-widest" : "py-4 px-8 bg-gray-100 text-blue-950 w-full uppercase tracking-widest"}>Availability</button>
            </div>
            <div className='py-8 px-6'>
                {isActive==="availability" ? (
                    <div>
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
