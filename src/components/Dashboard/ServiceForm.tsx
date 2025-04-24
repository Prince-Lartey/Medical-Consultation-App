"use client"

import React, { useState } from 'react'
import TextInput from '../FormInputs/TextInput'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import SubmitButton from '../FormInputs/SubmitButton'
import toast from 'react-hot-toast'
import ImageInput from '../FormInputs/ImageInput'
import { Button } from '../ui/button'
import Link from 'next/link'
import { X } from 'lucide-react'
import generateSlug from '@/utils/generateSlug'
import { createManyServices, createService } from '../../../actions/services'

export type ServiceProps = {
    title: string,
    imageUrl: string,
    slug: string,
}

export default function ServiceForm() {
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()

    
    const [imageUrl, setImageUrl] = useState("")

    const {register, reset, handleSubmit, formState: { errors }} = useForm<ServiceProps>({
        
    })

    async function onSubmit(data: ServiceProps) {
        setIsLoading(true)
        const slug = generateSlug(data.title)
        data.slug = slug
        data.imageUrl = imageUrl

        await createService(data)
        toast.success("Service created successfully")
        setIsLoading(false)
        reset()
        router.push("/dashboard/services")
    }

    // async function handleCreateMany() {
    //     setIsLoading(true)
    //     try {
    //         await createManyServices()
    //         toast.success("Services created successfully")
    //         setIsLoading(false)
    //     }catch (error) {
    //         console.error("Error creating many services:", error)
    //         toast.error("An error occurred while creating many services")
    //     }
    // }

    return (
        <div className="w-full max-w-xl shadow-sm rounded-md m-3 border border-gray-200 mx-auto">
            <div className="text-center border-b border-gray-200 py-4 dark:border-slate-600">
                <div className="flex justify-between items-center px-6">
                    <h1 className="scroll-m-20 text-2xl font-extrabold tracking-tight">Create a Service</h1>

                    {/* <Button type="button" onClick={handleCreateMany} disabled={isLoading}>
                        {isLoading ? "Creating..." : "Create Many"}
                    </Button> */}

                    <Button variant="outline">
                        <Link href="/dashboard/services" className="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">
                            <X className="w-4 h-4" />
                        </Link>
                    </Button>
                </div>
            </div>
            <form className="py-4 px-4 mx-auto " onSubmit={handleSubmit(onSubmit)}>
                <div className="grid grid-cols-2 gap-4">
                    <TextInput 
                        label="Service Title"
                        register={register}
                        name="title"
                        errors={errors}
                        placeholder="Enter Service Title"
                    />

                    <ImageInput 
                        label = "Service Image"
                        imageUrl = {imageUrl}
                        setImageUrl = {setImageUrl}
                        endpoint = "serviceImage"
                    />
                </div>
                
                <div className="flex justify-between items-center mt-8">
                    <Button variant="outline">
                        <Link href="/dashboard/services" className="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">
                            Cancel
                        </Link>
                    </Button>

                    <SubmitButton title="Create Service" buttonType="submit" loadingTitle="Please wait..." isLoading={isLoading}/>
                </div>
            </form>
        </div>
    )
}
