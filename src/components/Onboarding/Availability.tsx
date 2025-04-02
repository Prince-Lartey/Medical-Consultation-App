"use client"

import React, { useState } from 'react'
import TextInput from '../FormInputs/TextInput'
import { BioDataFormProps } from '../../../types/types'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import SubmitButton from '../FormInputs/SubmitButton'
import RadioInput from '../FormInputs/RadioInput'
import toast from 'react-hot-toast'

export type StepFormProps = {
    page: string;
    title: string;
    description: string;
}

export default function Availability({ page, title, description }: StepFormProps) {
    const {register, handleSubmit, reset, formState: { errors }} = useForm<BioDataFormProps>()
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()

    const availabilityOptions = [
        { label: 'Weekly (You are available for one or more times during the week, every week)', value: 'weekly' },
        { label: 'Specific Dates (You are only available on specific dates)', value: 'specific' },
    ]

    async function onSubmit(data: BioDataFormProps) {

        data.page = page
        console.log(data)
    }

    return (
        <div className="w-full">
            <div className="text-center border-b border-gray-200 pb-4">
                <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">{title}</h1>
                <p className="text-balance text-muted-foreground">
                    {description}
                </p>
            </div>
            <form className="py-4 px-4 mx-auto " onSubmit={handleSubmit(onSubmit)}>
                <div className="grid grid-cols-2 gap-4">
                    <TextInput 
                        label="What is the Duration for your Meetings?"
                        register={register}
                        name="meetingDuration"
                        type="number"
                        errors={errors}
                        className="col-span-full sm:col-span-1"
                    />

                    <RadioInput label="When are you available for meetings?" name="availabiltyType" register={register} errors={errors} radioOptions={availabilityOptions} />
                </div>
                
                <div className="flex justify-center items-center mt-8">
                    <SubmitButton title="Save and Continue" buttonType="submit" loadingTitle="Please wait..." isLoading={isLoading}/>
                </div>
            </form>
        </div>
    )
}
