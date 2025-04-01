"use client"

import React, { useState } from 'react'
import TextInput from '../FormInputs/TextInput'
import { BioDataFormProps, PracticeFormProps } from '../../../types/types'
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

export default function PracticeInfo({ page, title, description }: StepFormProps) {
    const {register, handleSubmit, reset, formState: { errors }} = useForm<PracticeFormProps>()
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()

    async function onSubmit(data: PracticeFormProps) {
        
        data.page = page
        console.log(data)
    }

    hospitalName: string;
    hospitalAddress: string;
    hospitalContactNumber: string;
    hospitalEmailAddress: string;
    hospitalWebsite: string;
    hospitalHoursOfOperation: number;
    servicesOffered: string[];
    insuranceAccepted: boolean;
    languageSpoken: string[];

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
                        label="Hospital Name"
                        register={register}
                        name="hospitalName"
                        type="text"
                        errors={errors}
                        placeholder="Enter Hospital Name"
                        className="col-span-full sm:col-span-1"
                    />
                    <TextInput 
                        label="Hospital Address"
                        register={register}
                        name="hospitalAddress"
                        type="text"
                        errors={errors}
                        placeholder="Enter Hospital Address"
                        className="col-span-full sm:col-span-1"
                    />
                    <TextInput 
                        label="Hospital Contact Number"
                        register={register}
                        name="hospitalContactNumber"
                        type="phone"
                        errors={errors}
                        placeholder="eg: 0241234567"
                        className="col-span-full sm:col-span-1"
                    />
                    <TextInput 
                        label="Hospital Email Address"
                        register={register}
                        name="hospitalEmailAddress"
                        type="email"
                        errors={errors}
                        placeholder="eg: princelartey@gmail.com"
                        className="col-span-full sm:col-span-1"
                    />
                    <TextInput 
                        label="Hospital Website"
                        register={register}
                        name="hospitalWebsite"
                        type="text"
                        errors={errors}
                        placeholder="www.hospital.com"
                        className="col-span-full sm:col-span-1"
                    />
                                        
                </div>
                
                <div className="flex justify-center items-center mt-8">
                    <SubmitButton title="Save and Continue" buttonType="submit" loadingTitle="Please wait..." isLoading={isLoading}/>
                </div>
            </form>
        </div>
    )
}
