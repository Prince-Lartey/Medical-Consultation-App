"use client"

import React, { useState } from 'react'
import TextInput from '../FormInputs/TextInput'
import { BioDataFormProps } from '../../../types/types'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import SubmitButton from '../FormInputs/SubmitButton'
import { StepFormProps } from './BioDataForm'

export default function ContactInfo({ page, title, description }: StepFormProps) {
    const {register, handleSubmit, reset, formState: { errors }} = useForm<BioDataFormProps>()
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()

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
                        label="Email Address"
                        register={register}
                        name="email"
                        type="email"
                        errors={errors}
                        placeholder="eg: princelartey@gmail.com"
                        className="col-span-full sm:col-span-1"
                    />
                    <TextInput 
                        label="Phone"
                        register={register}
                        name="phone"
                        type="number"
                        errors={errors}
                        placeholder="eg: 0241234567"
                        className="col-span-full sm:col-span-1"
                    />
                    <TextInput 
                        label="Region"
                        register={register}
                        name="region"
                        type="text"
                        errors={errors}
                        placeholder=""
                        className="col-span-full sm:col-span-1"
                    />
                    <TextInput 
                        label="City"
                        register={register}
                        name="region"
                        type="text"
                        errors={errors}
                        placeholder=""
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