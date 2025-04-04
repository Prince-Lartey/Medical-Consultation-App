"use client"

import React, { useState } from 'react'
import TextInput from '../FormInputs/TextInput'
import { PracticeFormProps } from '../../../types/types'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import SubmitButton from '../FormInputs/SubmitButton'
import toast from 'react-hot-toast'
import ArrayInput from '../FormInputs/ArrayInput'
import ShadSelectInput from '../FormInputs/ShadSelectInput'
import { StepFormProps } from './BioDataForm'
import { updateDoctorProfile } from '../../../actions/onboarding'

export default function PracticeInfo({ page, title, description, formId, nextPage, userId }: StepFormProps) {
    const {register, handleSubmit, reset, formState: { errors }} = useForm<PracticeFormProps>()
    const [isLoading, setIsLoading] = useState(false)
    const [services, setServices] = useState([])
    const [languages, setLanguages] = useState([])
    const [insuranceAccepted, setInsuranceAccepted] = useState("")
    const router = useRouter()

    const insuranceOptions = [
        {
            label: "Yes",
            value: "yes",
        },
        {
            label: "No",
            value: "no",
        }
    ]

    async function onSubmit(data: PracticeFormProps) {
        setIsLoading(true)
        data.page = page
        data.servicesOffered = services
        data.languageSpoken = languages
        data.insuranceAccepted = insuranceAccepted
        data.hospitalHoursOfOperation = Number(data.hospitalHoursOfOperation)

        try {
            const res = await updateDoctorProfile(formId, data)
            if (res?.status === 201) {
                toast.success("Practice information Completed")
                setIsLoading(false)
                router.push(`/onboarding/${userId}?page=${nextPage}`)
                console.log(res?.data)
            }else {
                setIsLoading(false)
                toast.error("Something went wrong")
            }
        } catch (error) {
            setIsLoading(false)
            console.log(error)
        }
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
                        label="Hospital Website (Optional)"
                        register={register}
                        name="hospitalWebsite"
                        type="text"
                        errors={errors}
                        placeholder="www.hospital.com"
                        className="col-span-full sm:col-span-1"
                        isRequired={false}
                    />
                    <TextInput 
                        label="Hospital Hours of Operation"
                        register={register}
                        name="hospitalHoursOfOperation"
                        type="number"
                        errors={errors}
                        placeholder="Enter Hospitals Hours of Opeartion"
                        className="col-span-full sm:col-span-1"
                    />
                    <ShadSelectInput
                        label="Do you accept Insurance"
                        optionTitle="Insurance Acceptable"
                        options={insuranceOptions}
                        selectedOptions={insuranceAccepted}
                        setSelectedOptions={setInsuranceAccepted}
                    />
                    <ArrayInput 
                        setItems={setServices}
                        items={services}
                        itemTitle="Add Hospital Services"
                    />
                    <ArrayInput 
                        setItems={setLanguages}
                        items={languages}
                        itemTitle="Add Languages Spoken at the Hospital"
                    />           
                </div>
                
                <div className="flex justify-center items-center mt-8">
                    <SubmitButton title="Save and Continue" buttonType="submit" loadingTitle="Please wait..." isLoading={isLoading}/>
                </div>
            </form>
        </div>
    )
}
