"use client"

import React, { useState } from 'react'
import TextInput from '../FormInputs/TextInput'
import { BioDataFormProps } from '../../../types/types'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import SubmitButton from '../FormInputs/SubmitButton'
import { StepFormProps } from './BioDataForm'
import SelectInput from '../FormInputs/SelectInput'
import ArrayInput from '../FormInputs/ArrayInput'
import MultipleImageInput from '../FormInputs/MultipleImageInput'

export default function ProfessionInfo({ page, title, description }: StepFormProps) {
    const {register, handleSubmit, reset, formState: { errors }} = useForm<BioDataFormProps>()
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()
    const [otherSpecialties, setOtherSpecialties] = useState([])
    const [docs, setDocs] = useState([])

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
                        options={[
                            {label: "Cardiology", value: "cardiology"},
                            {label: "Dermatology", value: "dermatology"},
                            {label: "Endocrinology", value: "endocrinology"},
                            {label: "Gastroenterology", value: "gastroenterology"},
                            {label: "Hematology", value: "hematology"},
                            {label: "Nephrology", value: "nephrology"},
                            {label: "Neurology", value: "neurology"},
                            {label: "Oncology", value: "oncology"},
                            {label: "Pulmonology", value: "pulmonology"},
                            {label: "Rheumatology", value: "rheumatology"},
                            {label: "Urology", value: "urology"},
                        ]}
                    />

                    <ArrayInput 
                        setItems={setOtherSpecialties}
                        items={otherSpecialties}
                        itemTitle="Add Other Specialties" 
                    />

                    <MultipleImageInput 
                        label="Upload your Certifications (max of 4 docs)"
                        imageUrls = {docs}
                        setImageUrls = {setDocs}
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
