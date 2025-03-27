"use client"

import React, { useState } from 'react'
import TextInput from '../FormInputs/TextInput'
import { BioDataFormProps } from '../../../types/types'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import SubmitButton from '../FormInputs/SubmitButton'
import DatePickerInput from '../FormInputs/DatePickerInput'
import TextAreaInput from '../FormInputs/TextAreaInput'
import RadioInput from '../FormInputs/RadioInput'
import toast from 'react-hot-toast'
import ImageInput from '../FormInputs/ImageInput'

export default function BioDataForm({page}: {page: string}) {
    const {register, handleSubmit, reset, formState: { errors }} = useForm<BioDataFormProps>()
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()
    const [dob, setDOB] = useState<Date>()
    const [expiry, setExpiry] = useState<Date>()
    const [profileImage, setProfileImage] = useState("")

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
        if (!expiry) {
            toast.error("Please select your license expiry date")
            return
        }

        data.dob = dob
        data.medicalLicenseExpiry = expiry
        data.page = page
        console.log(data)
    }

    return (
        <div className="w-full">
            <div className="text-center border-b border-gray-200 pb-4">
                <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">Bio Data</h1>
                <p className="text-balance text-muted-foreground">
                    Enter your details below to create a new account
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
                        placeholder="eg: Prince "
                    />
                    <TextInput 
                        label="Last Name"
                        register={register}
                        name="lastName"
                        type="text"
                        errors={errors}
                        placeholder="eg: Lartey"
                    />
                    <TextInput 
                        label="Middle Name (Optional)"
                        register={register}
                        name="middleName"
                        type="text"
                        errors={errors}
                        placeholder="eg: Kofi"
                    />
                    
                    <DatePickerInput date={dob} setDate={setDOB} title="Date of Birth" className="col-span-full sm:col-span-1"/>
                    
                    <TextInput 
                        label="Medical License"
                        register={register}
                        name="medicalLicense"
                        errors={errors}
                        placeholder="Enter Medical License"
                        className="col-span-full sm:col-span-1"
                    />
                    
                    <DatePickerInput date={expiry} setDate={setExpiry} title="Medical License Expiry" className="col-span-full sm:col-span-1"/>
                    <RadioInput label="Gender" name="gender" register={register} errors={errors} radioOptions={genderOptions} />

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
