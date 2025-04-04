"use client"

import React, { useState } from 'react'
import { AdditionalFormProps } from '../../../types/types'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import SubmitButton from '../FormInputs/SubmitButton'
import TextAreaInput from '../FormInputs/TextAreaInput'
import toast from 'react-hot-toast'
import { StepFormProps } from './BioDataForm'
import MultipleFileUpload from '../FormInputs/MultipleFileUpload'
import { updateDoctorProfile } from '../../../actions/onboarding'

export default function AdditionalInfo({ page, title, description, formId, nextPage, userId }: StepFormProps) {
    const {register, handleSubmit, reset, formState: { errors }} = useForm<AdditionalFormProps>()
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()
    const [additionalDocs, setAdditionalDocs] = useState([])

    async function onSubmit(data: AdditionalFormProps) {
        setIsLoading(true)
        data.page = page
        data.additionalDocs = additionalDocs.map((doc) => doc.url)

        try {
            const res = await updateDoctorProfile(formId, data)
            if (res?.status === 201) {
                toast.success("Additional information Completed")
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
                    <TextAreaInput 
                        label="Education History"
                        register={register}
                        name="educationHistory"
                        errors={errors}
                        placeholder="Enter your Education History"
                    />

                    <TextAreaInput 
                        label="Published Works or Research"
                        register={register}
                        name="research"
                        errors={errors}
                        placeholder="Enter your Research works"
                    />
                    <TextAreaInput 
                        label="Accomplishments or Awards"
                        register={register}
                        name="accomplishments"
                        errors={errors}
                        placeholder="Enter your Accomplshments or Awards"
                    />

                    <MultipleFileUpload
                        label="Any Additional Documents (CV, Medical Certificates, etc.) Upload"
                        files = {additionalDocs}
                        setFiles = {setAdditionalDocs}
                        endpoint = "additionalDocs"
                    />
                </div>
                
                <div className="flex justify-center items-center mt-8">
                    <SubmitButton title="Save and Continue" buttonType="submit" loadingTitle="Please wait..." isLoading={isLoading}/>
                </div>
            </form>
        </div>
    )
}
