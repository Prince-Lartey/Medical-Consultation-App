"use client"

import RadioInput from '@/components/FormInputs/RadioInput'
import SelectInput from '@/components/FormInputs/SelectInput'
import TextInput from '@/components/FormInputs/TextInput'
import { Button } from '@/components/ui/button'
import { Appointment } from '@prisma/client'
import { Loader } from 'lucide-react'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { updateAppointmentById } from '../../../../actions/appointments'
import toast from 'react-hot-toast'

export type AppointmentUpdateProps = {
    status: string;
    meetingLink: string;
    meetingProvider: string;
}

export default function UpdateAppointmentForm({appointment}: {appointment: Appointment}) {
    const [loading, setLoading] = useState(false)
    const statusOptions = [
        {
            label: "Pending",
            value: "pending"
        },
        {
            label: "Approve",
            value: "approved"
        },
        {
            label: "Reject",
            value: "rejected"
        },
        
    ]

    const meetingProviders = [
        {
            label: "Zoom",
            value: "zoom"
        },
        {
            label: "Google Meet",
            value: "google-meet"
        },
        {
            label: "Microsoft Teams",
            value: "microsoft-teams"
        },
    ]

    const {register, handleSubmit, formState: { errors }} = useForm<AppointmentUpdateProps>({
        defaultValues: {
            status: appointment.status,
            meetingLink: appointment.meetingLink,
            meetingProvider: appointment.meetingProvider,
        }
    })

    async function handleUpdate(data: AppointmentUpdateProps) {
        setLoading(true)
        try {
            await updateAppointmentById(appointment.id, data)
            setLoading(false)
            toast.success("Appointment updated successfully")
        }
        catch (error) {
            setLoading(false)
            console.error("Error updating price:", error)
        }
    }

    return (
        <form className="border-2 border-gray-700 shadow rounded-md p-4 my-4 mx-4" onSubmit={handleSubmit(handleUpdate)}>
            <div className="sm:col-span-4">
                <div className="border-b pb-2 flex justify-between items-center">
                    <label htmlFor="username" className="scroll-m-20 text-xl font-semibold tracking-tight py-2 mb-3">Update Appointment</label>
                    <Button type="submit" disabled={loading}>
                        {loading ? <span className="flex"><Loader className="mr-2 h-4 w-4 animate-spin" />Please wait...</span> : "Update Appointment"}
                    </Button>
                </div>
                
                <div className="py-3">                   
                    <div className="py-2">
                        <TextInput 
                            label="Add Meeting Link"
                            register={register}
                            name="meetingLink"
                            errors={errors}
                            placeholder="https://meet.google.com/jht-whxm-yrx"
                        />
                    </div>
                    <div className="py-2">
                        <div className="grid grid-cols-2 gap-6">
                            <SelectInput 
                                label="Meeting Providers"
                                name="meetingProvider"
                                register={register}
                                options={meetingProviders}
                                className="col-span-1"
                            />

                            <RadioInput 
                                label="Approve or Reject Appointment"
                                name="status"
                                errors={errors}
                                register={register}
                                radioOptions={statusOptions}
                                className="col-span-1"
                            />
                        </div>
                    </div>
                    
                </div>
            </div>
            
        </form>
    )
}
