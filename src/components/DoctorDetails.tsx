"use client"

import React, { useState } from 'react'
import { AppointmentProps, DoctorDetail } from '../../types/types'
import { Button } from './ui/button'
import { Calendar } from './ui/calendar'
import getFormattedLongDate from '@/utils/getFormattedLongDate'
import { getDayFromDate } from '@/utils/getDayFromDate'
import { Loader, MoveRight } from 'lucide-react'
import TextInput from './FormInputs/TextInput'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import DatePickerInput from './FormInputs/DatePickerInput'
import RadioInput from './FormInputs/RadioInput'
import TextAreaInput from './FormInputs/TextAreaInput'
import MultipleFileUpload, { File } from './FormInputs/MultipleFileUpload'
import { useSession } from 'next-auth/react'
import { createAppointment } from '../../actions/appointments'
import toast from 'react-hot-toast'

export default function DoctorDetails({doctor}: {doctor: DoctorDetail}) {
    const {data: session} = useSession()
    const patient = session?.user

    const [isActive, setIsActive] = useState("availability")
    const [step, setStep] = useState(1)
    const [date, setDate] = useState<Date | undefined>(new Date())
    const day = getDayFromDate(date?.toDateString())

    const formattedDate = getFormattedLongDate(date!.toDateString())    
    const isAvailableDoctors = doctor.doctorProfile?.availability?.[day] ?? null
    const [selectedTime, setSelectedTime] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [dob, setDob] = useState<Date | undefined>(undefined)
    const [medicalDocs, setMedicalDocs] = useState<File[]>([])
    const router = useRouter()

    const genderOptions = [
        {
            label: "Male",
            value: "male"
        },
        {
            label: "Female",
            value: "female"
        },

    ]

    const {register, reset, handleSubmit, formState: { errors }} = useForm<AppointmentProps>({
        defaultValues: {
            email: patient?.email ?? "",
        }
    })

    async function onSubmit(data: AppointmentProps) {
        setIsLoading(true)
        data.dob = dob
        data.appointmentDate = date
        data.appointmentFormattedDate = formattedDate
        data.appointmentTime = selectedTime
        data.doctorId = doctor.id
        data.charge = doctor.doctorProfile?.hourlyWage ?? 0
        data.doctorProfileId = doctor.doctorProfile?.id ?? ""
        data.medicalDocuments = medicalDocs.map((file) => file.url)
        data.patientId = patient?.id
        console.log(data)

        try {
            await createAppointment(data)
            setIsLoading(false)
            toast.success("Appointment Created Successfully")
            router.push("/dashboard/user/appointments")

        } catch (error) {
            console.log(error)
            setIsLoading(false)
        }
    }

    function initiateAppointment() {
        if (patient?.id){
            setStep((currStep) => currStep + 1)
        } else {
            router.push("/login")
        }
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
                                                    <button type="button" className="text-white bg-blue-600 hover:bg-blue-600/80 focus:ring-4 focus:outline-none focus:ring-blue-600/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:hover:bg-blue-600/80 dark:focus:ring-blue-600/40 me-2 mb-2" onClick={initiateAppointment}>
                                                        Book Doctor (GHS {doctor.doctorProfile?.hourlyWage})
                                                        <MoveRight className="w-6 h-6 ml-3"/>
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
                        <form className="py-4 px-4 mx-auto" onSubmit={handleSubmit(onSubmit)}>
                            <h2 className="scroll-m-20 border-b pb-3 mb-6 text-3xl font-semibold tracking-tight first:mt-0">Tell Us About Yourself to Help the Doctor Diagnose You</h2>
                            {
                                step === 2 ? (
                                    <div className="space-y-6">
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
                                        <div className="grid grid-cols-2 gap-6">
                                            <RadioInput 
                                                label="Gender"
                                                register={register}
                                                name="gender"
                                                errors={errors}
                                                className="col-span-1"
                                                radioOptions={genderOptions}
                                            />
                                            <DatePickerInput 
                                                date={dob}
                                                setDate={setDob}
                                                title="Date of Birth"
                                                className="col-span-1"
                                            />
                                        </div> 
                                        <div className="flex justify-between items-center mt-8">
                                            <Button variant={"outline"} type="button" onClick={() => setStep((currStep) => currStep - 1)}>Previous</Button>
                                            <Button type="button" onClick={() => setStep((currStep) => currStep + 1)}>Next</Button>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="space-y-6">
                                        <div className="grid grid-cols-2 gap-6">
                                            <TextInput 
                                                label="Your Location"
                                                register={register}
                                                name="location"
                                                errors={errors}
                                                placeholder="Enter your Location"
                                                className="col-span-1"
                                            />
                                            <TextInput 
                                                label="Occupation"
                                                register={register}
                                                name="occupation"
                                                errors={errors}
                                                placeholder="Enter your Occupation"
                                                className="col-span-1"
                                            />
                                        </div>
                                        <TextAreaInput 
                                            label="Reason for Appointment"
                                            register={register}
                                            name="appointmentReason"
                                            errors={errors}
                                            placeholder="Enter your Reason for Appointment"
                                        />
                                        <MultipleFileUpload 
                                            label="Upload your Medical Documents (max of 4 docs)"
                                            files = {medicalDocs}
                                            setFiles = {setMedicalDocs}
                                            endpoint = "patientMedicalFiles"
                                        />
                                        <div className="flex justify-between items-center mt-8">
                                            <Button variant={"outline"} type="button" onClick={() => setStep((currStep) => currStep - 1)}>Previous</Button>
                                            {
                                                isLoading ? (
                                                    <Button type="button" disabled className="flex items-center gap-2">
                                                        <Loader className="w-4 h-4 animate-spin" /> Submitting...
                                                    </Button>
                                                ) : (
                                                    <Button type="submit">Complete Appointment</Button>
                                                )
                                            }
                                        </div>
                                    </div>
                                )
                            }
                        </form>
                        
                    </div>
                )
            }
        </>
    )
}
