"use client"

import React, { useState } from 'react'
import { AppointmentProps, DoctorDetail } from '../../types/types'
import { Button } from './ui/button'
import { Calendar } from './ui/calendar'
import getFormattedLongDate from '@/utils/getFormattedLongDate'
import { getDayFromDate } from '@/utils/getDayFromDate'
import { MoveRight } from 'lucide-react'
import Link from 'next/link'
import ImageInput from './FormInputs/ImageInput'
import TextInput from './FormInputs/TextInput'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'

export default function DoctorDetails({doctor}: {doctor: DoctorDetail}) {
    const [isActive, setIsActive] = useState("availability")
    const [step, setStep] = useState(1)
    const [date, setDate] = useState<Date | undefined>(new Date())
    const day = getDayFromDate(date?.toDateString())

    const formattedDate = getFormattedLongDate(date!.toDateString())    
    const isAvailableDoctors = doctor.doctorProfile?.availability?.[day] ?? null
    const [selectedTime, setSelectedTime] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    // const [imageUrl, setImageUrl] = useState(initialImageUrl)
    const router = useRouter()

    const {register, reset, handleSubmit, formState: { errors }} = useForm<AppointmentProps>({
        // defaultValues: initialData
    })

    async function onSubmit(data: AppointmentProps) {
        setIsLoading(true)
        console.log(data)
    }


    return (
        <>
            {
                step === 1 ? (
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
                                        {
                                            selectedTime && (
                                                <div className="py-2">
                                                    <button type="button" className="text-white bg-blue-600 hover:bg-blue-600/80 focus:ring-4 focus:outline-none focus:ring-blue-600/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:hover:bg-blue-600/80 dark:focus:ring-blue-600/40 me-2 mb-2" onClick={() => setStep((currStep) => currStep + 1)}>
                                                        Book Doctor (GHS {doctor.doctorProfile?.hourlyWage})
                                                        <MoveRight className="w-6 h-6 ml-3" />
                                                    </button>
                                                </div>
                                            )
                                        }
                                        
                                    </div>
                                </div>
                            ) : (
                                <div>
                                    Service Details Components
                                </div>
                            )}
                        </div>
                    </div>
                ) : (
                    <div className="p-8 shadow-2xl">
                        <h1>This is step 2</h1>
                        <form className="py-4 px-4 mx-auto space-y-6" onSubmit={handleSubmit(onSubmit)}>
                            <div className="grid grid-cols-2 gap-6">
                                <TextInput 
                                    label="First Name"
                                    register={register}
                                    name="firstName"
                                    errors={errors}
                                    placeholder="Enter First Name"
                                    className="col-span-1"
                                />
                                <TextInput 
                                    label="Last Name"
                                    register={register}
                                    name="lastName"
                                    errors={errors}
                                    placeholder="Enter Last Name"
                                    className="col-span-1"
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-6">
                                <TextInput 
                                    label="Phone Number"
                                    register={register}
                                    name="phone"
                                    errors={errors}
                                    placeholder="Enter Phone Number"
                                    className="col-span-1"
                                />
                                <TextInput 
                                    label="Email Address"
                                    register={register}
                                    name="email"
                                    errors={errors}
                                    placeholder="Enter Email Address"
                                    className="col-span-1"
                                />
                            </div>
                            
                            <div className="flex justify-between items-center mt-8">
                                <Button variant={"outline"} type="button" onClick={() => setStep((currStep) => currStep - 1)}>Previous</Button>
                                <Button>Submit</Button>
                            </div>
                        </form>
                        
                    </div>
                )
            }
        </>
    )
}
