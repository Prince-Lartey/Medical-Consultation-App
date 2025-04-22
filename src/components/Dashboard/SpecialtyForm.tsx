"use client"

import React, { useState } from 'react'
import TextInput from '../FormInputs/TextInput'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import SubmitButton from '../FormInputs/SubmitButton'
import toast from 'react-hot-toast'
import { Button } from '../ui/button'
import Link from 'next/link'
import { X } from 'lucide-react'
import generateSlug from '@/utils/generateSlug'
import { createManySpecialties, createSpecialty } from '../../../actions/specialties'

export type SpecialtyProps = {
    title: string,
    slug: string,
}

export default function SpecialtyForm() {
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()

    const {register, reset, handleSubmit, formState: { errors }} = useForm<SpecialtyProps>({
        
    })

    async function onSubmit(data: SpecialtyProps) {
        setIsLoading(true)
        const slug = generateSlug(data.title)
        data.slug = slug

        await createSpecialty(data)
        toast.success("Specialty created successfully")
        setIsLoading(false)
        reset()
        router.push("/dashboard/specialties")
    }

    async function handleCreateMany() {
        setIsLoading(true)
        try {
            await createManySpecialties()
            toast.success("Services created successfully")
            setIsLoading(false)
        }catch (error) {
            console.error("Error creating many services:", error)
            toast.error("An error occurred while creating many services")
        }
    }

    return (
        <div className="w-full max-w-xl shadow-sm rounded-md m-3 border border-gray-200 mx-auto ">
            <div className="text-center border-b border-gray-200 py-4 dark:border-slate-600">
                <div className="flex justify-between items-center px-6">
                    <h1 className="scroll-m-20 text-2xl font-extrabold tracking-tight">Create a Specialty</h1>

                    <Button onClick={handleCreateMany} disabled={isLoading}>
                        {isLoading ? "Creating..." : "Create Many"}
                    </Button>

                    <Button variant="outline">
                        <Link href="/dashboard/specialties" className="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">
                            <X className="w-4 h-4" />
                        </Link>
                    </Button>
                </div>
            </div>
            <form className="py-4 px-4 mx-auto " onSubmit={handleSubmit(onSubmit)}>
                <div className="grid grid-cols-2 gap-4">
                    <TextInput 
                        label="Specialty Title"
                        register={register}
                        name="title"
                        errors={errors}
                        placeholder="Enter Specialty Title"
                    />
                </div>
                
                <div className="flex justify-between items-center mt-8">
                    <Button variant="outline">
                        <Link href="/dashboard/specialties" className="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">
                            Cancel
                        </Link>
                    </Button>

                    <SubmitButton title="Create Specialty" buttonType="submit" loadingTitle="Please wait..." isLoading={isLoading}/>
                </div>
            </form>
        </div>
    )
}
