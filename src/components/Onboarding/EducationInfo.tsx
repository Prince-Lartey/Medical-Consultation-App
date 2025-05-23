"use client"

import React, { useState } from 'react'
import TextInput from '../FormInputs/TextInput'
import { EducationInfoProps } from '../../../types/types'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import SubmitButton from '../FormInputs/SubmitButton'
import { StepFormProps } from './BioDataForm'
import SelectInput from '../FormInputs/SelectInput'
import ArrayInput from '../FormInputs/ArrayInput'
import MultipleFileUpload, { File } from '../FormInputs/MultipleFileUpload'
import toast from 'react-hot-toast'
import { updateDoctorProfile } from '../../../actions/onboarding'
import { useOnboardingContext } from '@/context/context'
import { Specialty } from '@prisma/client'

interface EducationProps extends StepFormProps {
    specialties: Specialty[];
}

export default function EducationInfo({ page, title, description, formId, nextPage, userId, specialties }: EducationProps) {
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()
    const { educationData, setEducationData, savedDBData } = useOnboardingContext()

    const initialOtherSpecialities = educationData.otherSpecialties.length > 0 ? educationData.otherSpecialties : savedDBData.otherSpecialties
    const initialDocs = educationData.boardCertificates.length > 0 ? educationData.boardCertificates : savedDBData.boardCertificates
    const [otherSpecialties, setOtherSpecialties] = useState(initialOtherSpecialities)
    const [docs, setDocs] = useState<File[]>(initialDocs)

    const allSpecialties = specialties?.map((specialty) => {
        return {
            label: specialty.title,
            value: specialty.id
        }
    })

    const {register, handleSubmit, formState: { errors }} = useForm<EducationInfoProps>({
        defaultValues: {
            medicalSchool: educationData.medicalSchool || savedDBData.medicalSchool,
            graduationYear: educationData.graduationYear || savedDBData.graduationYear,
            primarySpecialization: educationData.primarySpecialization || savedDBData.primarySpecialization,
            page: educationData.page || savedDBData.page,
        }
    })

    async function onSubmit(data: EducationInfoProps) {
        setIsLoading(true)
        data.otherSpecialties = otherSpecialties
        data.boardCertificates = docs.map((doc) => doc.url)
        data.page = page

        try {
            const res = await updateDoctorProfile(formId, data)
            if (res?.status === 201) {
                toast.success("Education information Completed")
                setIsLoading(false)
                router.push(`/onboarding/${userId}?page=${nextPage}`)
                console.log(res?.data)
                setEducationData(data)
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
                        label="Medical School"
                        register={register}
                        name="medicalSchool"
                        type="text"
                        errors={errors}
                        placeholder="Enter your Medical School Name"
                    />
                    <TextInput 
                        label="Graduation Year"
                        register={register}
                        name="graduationYear"
                        type="number"
                        errors={errors}
                        placeholder="Enter your Grad Year"
                        className="col-span-full sm:col-span-1"
                    />
                    <SelectInput
                        label="Select your Primary Specializations"
                        name="primarySpecialization"
                        register={register}
                        className="col-span-full sm:col-span-1"
                        options={allSpecialties}
                    />

                    <ArrayInput 
                        setItems={setOtherSpecialties}
                        items={otherSpecialties}
                        itemTitle="Add Other Specialties"
                    />

                    <MultipleFileUpload 
                        label="Upload your Certifications (max of 4 docs)"
                        files = {docs}
                        setFiles = {setDocs}
                        endpoint = "doctorProfessionDocs"
                    />
                </div>
                
                <div className="flex justify-center items-center mt-8">
                    <SubmitButton title="Save and Continue" buttonType="submit" loadingTitle="Please wait..." isLoading={isLoading}/>
                </div>
            </form>
        </div>
    )
}
