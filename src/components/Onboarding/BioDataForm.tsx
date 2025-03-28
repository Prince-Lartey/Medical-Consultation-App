"use client"

import React, { useState } from 'react'
import TextInput from '../FormInputs/TextInput'
import { BioDataFormProps } from '../../../types/types'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import SubmitButton from '../FormInputs/SubmitButton'
import DatePickerInput from '../FormInputs/DatePickerInput'
import RadioInput from '../FormInputs/RadioInput'
import toast from 'react-hot-toast'

export type StepFormProps = {
    page: string;
    title: string;
    description: string;
}

export default function BioDataForm({ page, title, description }: StepFormProps) {
    const {register, handleSubmit, reset, formState: { errors }} = useForm<BioDataFormProps>()
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()
    const [dob, setDOB] = useState<Date>()

    const genderOptions = [
        {
            label: "Male",
            value: "male",
        },
        {
            label: "Female",
            value: "female",
        }
    ]

    async function onSubmit(data: BioDataFormProps) {
        if (!dob) {
            toast.error("Please select your date of birth")
            return
        }

        data.dob = dob
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
                        label="First Name"
                        register={register}
                        name="firstName"
                        type="text"
                        errors={errors}
                        placeholder="eg: Prince"
                        className="col-span-full sm:col-span-1"
                    />
                    <TextInput 
                        label="Last Name"
                        register={register}
                        name="lastName"
                        type="text"
                        errors={errors}
                        placeholder="eg: Lartey"
                        className="col-span-full sm:col-span-1"
                    />
                    <TextInput 
                        label="Middle Name (Optional)"
                        register={register}
                        name="middleName"
                        type="text"
                        errors={errors}
                        placeholder="eg: Kofi"
                        className="col-span-full sm:col-span-1"
                    />
                    
                    <DatePickerInput date={dob} setDate={setDOB} title="Date of Birth" className="col-span-full sm:col-span-1"/>
                    
                    <RadioInput label="Gender" name="gender" register={register} errors={errors} radioOptions={genderOptions} />
                </div>
                
                <div className="flex justify-center items-center mt-8">
                    <SubmitButton title="Save and Continue" buttonType="submit" loadingTitle="Please wait..." isLoading={isLoading}/>
                </div>
            </form>
        </div>
    )
}
