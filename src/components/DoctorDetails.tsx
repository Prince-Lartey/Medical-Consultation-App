"use client"

import React, { useEffect, useState } from 'react'
import { AppointmentProps, DoctorDetail } from '../../types/types'
import { Button } from './ui/button'
import { Calendar } from './ui/calendar'
import getFormattedLongDate from '@/utils/getFormattedLongDate'
import { getDayFromDate } from '@/utils/getDayFromDate'
import { Check, Loader, MoveRight } from 'lucide-react'
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
import { Appointment, paymentStatus } from '@prisma/client'
import { createRoom } from '../../actions/hms'
import type { usePaystackPayment as PaystackHookType } from 'react-paystack';
import { CreateSale } from '../../actions/sales'
import Image from 'next/image'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"


export default function DoctorDetails({doctor, appointment}: {doctor: DoctorDetail, appointment: Appointment}) {
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

    const [isClient, setIsClient] = useState(false);
    const [PaystackButton, setPaystackButton] = useState<typeof PaystackHookType | null>(null);
    const initialPayment: {
        transactionId: string
        paymentStatus: paymentStatus
        paymentMethod: string
        paymentAmount: number
        reference: string 
    } = {
        transactionId: "",
        paymentStatus: "pending",
        paymentMethod: "paystack",
        paymentAmount: 0,
        reference: ""
    }
    const [paymentDetails, setPaymentDetails] = useState(initialPayment)
    const [paymentSuccess, setPaymentSuccess] = useState(false)

    const config = {
        reference: (new Date()).getTime().toString(),
        email: "user@example.com",
        amount: doctor.doctorProfile?.hourlyWage,
        publicKey: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY as string,
        currency: "GHS",
    };
    
    useEffect(() => {
        setIsClient(true);
        // Import the Paystack hook dynamically only on the client side
        const importPaystack = async () => {
        const { usePaystackPayment } = await import('react-paystack');
        setPaystackButton(() => usePaystackPayment);
        };
        
        importPaystack();
    }, []);

    const handlePayment = () => {
        if (!PaystackButton) return;

        const onSuccess = (ref: any) => {
            setPaymentDetails({
                transactionId: ref.transaction,
                paymentStatus: "completed",
                paymentMethod: "paystack",
                paymentAmount: doctor.doctorProfile?.hourlyWage ?? 0,
                reference: ref.reference
            })
            setPaymentSuccess(true)
        };
        

        const onClose = () => {
            console.log('closed');
        };

        const initializePayment = PaystackButton(config);
        initializePayment({ onSuccess, onClose });
    };

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

    const {register, handleSubmit, formState: { errors }} = useForm<AppointmentProps>({
        defaultValues: {
            email: appointment?.email ?? "",
            firstName: appointment?.firstName ?? "",
            lastName: appointment?.lastName ?? "",
            phone: appointment?.phone ?? "",
            location: appointment?.location ?? "",
            occupation: appointment?.occupation ?? "" ,
            gender: appointment?.gender ?? ""
        }
    })

    async function onSubmit(data: AppointmentProps) {
        setIsLoading(true)
        data.dob = dob
        data.appointmentDate = date
        data.appointmentFormattedDate = formattedDate
        data.appointmentTime = selectedTime
        data.doctorId = doctor.id
        data.doctorName = doctor.name
        data.charge = doctor.doctorProfile?.hourlyWage ?? 0
        data.doctorProfileId = doctor.doctorProfile?.id ?? ""
        data.medicalDocuments = medicalDocs.map((file) => file.url)
        data.patientId = patient?.id

        data.transactionId = paymentDetails.transactionId
        data.paymentAmount = paymentDetails.paymentAmount
        data.paymentMethod = paymentDetails.paymentMethod
        data.paymentStatus = paymentDetails.paymentStatus
        data.reference = paymentDetails.reference

        try {
            const doctorFirstName = doctor.name.split(" ")[0]
            const patientFirstName = patient?.name?.split(" ")[0]
            const roomName = `Dr. ${doctorFirstName} meeting with ${patientFirstName}` 

            const roomData = await createRoom(roomName)
            if(roomData.error){
                toast.error("Error creating room")
                setIsLoading(false)
                return
            }
            const meetingLink = `/meeting/${roomData.roomId}`
            data.meetingLink = meetingLink 

            const res = await createAppointment(data)

            const sale = await CreateSale({
                appointmentId: res.data.id,
                doctorId: doctor.id,
                doctorName: doctor.name,
                patientId: patient?.id ?? "",
                patientName: patient?.name ?? "",
                totalAmount: res.data.charge ?? 0
            })
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
                            {step <=3 && <h2 className="scroll-m-20 border-b pb-3 mb-6 text-3xl font-semibold tracking-tight first:mt-0">Tell Us About Yourself to Help the Doctor Diagnose You</h2>}
                            {step === 2 && (
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
                            )}
                            {step === 3 && (
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
                                        <Button type="button" onClick={() => setStep((currStep) => currStep + 1)}>Next</Button>
                                    </div>
                                </div>
                            )}
                            {step === 4 && (
                                <div>
                                    {paymentSuccess ? (
                                        <Card className='w-full max-w-md mx-auto flex flex-col items-center justify-center py-2'>
                                            <div className='w-24 h-24 rounded-full flex items-center justify-center bg-lime-200'>
                                                <Check className="lime-text-600 w-14 h-14"/>
                                            </div>
                                            <CardHeader>
                                                <CardTitle className='text-lime-700 text-xl'>Payment Successful</CardTitle>
                                            </CardHeader>
                                            <CardFooter className='flex items-center justify-center'>
                                                {
                                                    isLoading ? (
                                                        <Button type="button" disabled className="flex items-center gap-2">
                                                            <Loader className="w-4 h-4 animate-spin" /> Submitting...
                                                        </Button>
                                                    ) : (
                                                        <Button type="submit">Complete Appointment</Button>
                                                    )
                                                }
                                            </CardFooter>
                                        </Card>
                                    ) : (
                                        <div>
                                            {isClient && (
                                                <Card className='w-full max-w-md mx-auto flex flex-col items-center justify-center'>
                                                    <CardHeader>
                                                        <CardTitle>Make Payment</CardTitle>
                                                    </CardHeader>
                                                    <CardContent className='space-y-6'>
                                                        <div className='text-center'>
                                                            <p className='text-sm text-muted-foreground'>Total Amount</p>
                                                            <p className='text-4xl font-bold'>GHS {doctor.doctorProfile?.hourlyWage.toLocaleString()}{" "}</p>
                                                        </div>
                                                    </CardContent>
                                                    <CardFooter>
                                                        <button className='w-full bg-[#00C3F7] hover:bg-[#00A1D1] text-white font-bold py-3 px-4 rounded-lg transition-colors duration-300 flex items-center justify-center space-x-2' type='button' onClick={handlePayment} disabled={!PaystackButton}>
                                                            <Image src="/paystack.png" alt='paystack' width={512} height={504} className='w-6 h-6 mr-2' />
                                                            <span>Pay with Paystack</span>
                                                        </button>
                                                    </CardFooter>
                                                </Card>
                                            )}
                                        </div>
                                    )}
                                    

                                    
                                    <div className="flex justify-between items-start mt-8">
                                        <Button variant={"outline"} type="button" onClick={() => setStep((currStep) => currStep - 1)}>Previous</Button>
                                    </div>
                                </div>
                            )}
                        </form>
                        
                    </div>
                )
            }
        </>
    )
}
