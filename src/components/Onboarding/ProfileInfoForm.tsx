"use client"

import React, { useState } from 'react'
import TextInput from '../FormInputs/TextInput'
import { BioDataFormProps } from '../../../types/types'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import SubmitButton from '../FormInputs/SubmitButton'
import DatePickerInput from '../FormInputs/DatePickerInput'
import TextAreaInput from '../FormInputs/TextAreaInput'
import toast from 'react-hot-toast'
import ImageInput from '../FormInputs/ImageInput'
import { StepFormProps } from './BioDataForm'

export default function ProfileInfoForm({ page, title, description }: StepFormProps) {
    const {register, handleSubmit, reset, formState: { errors }} = useForm<BioDataFormProps>()
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()
    const [expiry, setExpiry] = useState<Date>()
    const [profileImage, setProfileImage] = useState("")

    async function onSubmit(data: BioDataFormProps) {
        if (!expiry) {
            toast.error("Please select your license expiry date")
            return
        }

        data.medicalLicenseExpiry = expiry
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
                        label="Medical License"
                        register={register}
                        name="medicalLicense"
                        errors={errors}
                        placeholder="Enter Medical License"
                    />
                    
                    <TextInput 
                        label="Years of Experience"
                        register={register}
                        name="experience"
                        errors={errors}
                        type="number"
                        placeholder="Enter Years of Experience"
                        className="col-span-full sm:col-span-1"
                    />

                    <DatePickerInput date={expiry} setDate={setExpiry} title="Medical License Expiry" className="col-span-full sm:col-span-1"/>

                    <TextAreaInput 
                        label="Biography"
                        register={register}
                        name="bio"
                        errors={errors}
                        placeholder=""
                    />

                    <ImageInput 
                        label = "Professional Profile Image"
                        imageUrl = {profileImage}
                        setImageUrl = {setProfileImage}
                        endpoint = "doctorProfileImage"
                    />
                </div>
                
                <div className="flex justify-center items-center mt-8">
                    <SubmitButton title="Save and Continue" buttonType="submit" loadingTitle="Please wait..." isLoading={isLoading}/>
                </div>
            </form>
        </div>
    )
}
