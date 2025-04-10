"use client"

import React, { useState } from 'react'
import TextInput from '../FormInputs/TextInput'
import { ProfileFormProps } from '../../../types/types'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import SubmitButton from '../FormInputs/SubmitButton'
import DatePickerInput from '../FormInputs/DatePickerInput'
import TextAreaInput from '../FormInputs/TextAreaInput'
import toast from 'react-hot-toast'
import ImageInput from '../FormInputs/ImageInput'
import { StepFormProps } from './BioDataForm'
import { updateDoctorProfile } from '../../../actions/onboarding'
import { useOnboardingContext } from '@/context/context'

export default function ProfileInfoForm({ page, title, description, formId, nextPage, userId }: StepFormProps) {
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()
    const {profileData, setProfileData, savedDBData} = useOnboardingContext()

    const initialExpiryDate = profileData.medicalLicenseExpiry || savedDBData.medicalLicenseExpiry
    const initialProfileImage = profileData.profilePicture || savedDBData.profilePicture
    const [expiry, setExpiry] = useState<Date>(initialExpiryDate)
    const [profileImage, setProfileImage] = useState(initialProfileImage)

    const {register, handleSubmit, formState: { errors }} = useForm<ProfileFormProps>({
        defaultValues: {
            medicalLicense: profileData.medicalLicense || savedDBData.medicalLicense,
            medicalLicenseExpiry: profileData.medicalLicenseExpiry || savedDBData.medicalLicenseExpiry,
            yearsOfExperience: profileData.yearsOfExperience || savedDBData.yearsOfExperience,
            bio: profileData.bio || savedDBData.bio,
            page: profileData.page || savedDBData.page,
            profilePicture: profileData.profilePicture || savedDBData.profilePicture,
        }
    })

    async function onSubmit(data: ProfileFormProps) {
        setIsLoading(true)
        if (!expiry) {
            toast.error("Please select your license expiry date")
            setIsLoading(false)
            return
        }

        data.yearsOfExperience = Number(data.yearsOfExperience)
        data.medicalLicenseExpiry = expiry
        data.page = page
        data.profilePicture = profileImage
        console.log(data)

        try {
            const res = await updateDoctorProfile(formId, data)

            if (res?.status === 201) {
                toast.success("Profile Information Completed")
                setIsLoading(false)
                router.push(`/onboarding/${userId}?page=${nextPage}`)
                console.log(res?.data)
                setProfileData(data)
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
                        label="Medical License"
                        register={register}
                        name="medicalLicense"
                        errors={errors}
                        placeholder="Enter Medical License"
                    />
                    
                    <TextInput 
                        label="Years of Experience"
                        register={register}
                        name="yearsOfExperience"
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
