"use client"

import { Button } from '@/components/ui/button'
import { CardContent } from '@/components/ui/card'
import { DoctorProfile, Service, Specialty, Symptom } from '@prisma/client'
import { Loader, Map, Video } from 'lucide-react'
// import { useSession } from 'next-auth/react'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { updateDoctorService } from '../../../../actions/services'
import Image from 'next/image'
import { cn } from '@/lib/utils'

export default function UpdateServiceForm({services, specialties, symptoms, profile}: {services: Service[], specialties: Specialty[], symptoms: Symptom[], profile: DoctorProfile}) {
    // const {data: session, status} = useSession()
    // const user = session?.user

    const profileId = profile?.id

    const [selectedServiceId, setSelectedServiceId] = useState(profile?.serviceId)
    const [specialtyId, setSpecialtyId] = useState(profile?.specialtyId)
    const [symptomIds, setSymptomIds] = useState<string[]>(profile?.symptomIds || [])
    const [operationMode, setOperationMode] = useState(profile?.operationMode)

    const [savingServices, setSavingServices] = useState(false)
    const [savingSpecialty, setSavingSpecialty] = useState(false)
    const [savingSymptoms, setSavingSymptoms] = useState(false)
    const [savingOperationMode, setSavingOperationMode] = useState(false)

    const operationModes = [
        {
            title: "Telehealth Visit",
            slug: "telehealth-visit",
            icon: Video
        },
        {
            title: "In-Person Doctor Visit",
            slug: "in-person-doctor-visit",
            icon: Map
        },
    ]

    async function handleUpdateService() {
        setSavingServices(true)
        const data = {
            serviceId: selectedServiceId,
        }
        try{
            await updateDoctorService(profileId, data)
            setSavingServices(false)
            toast.success("Services updated successfully")
        }catch (error){
            console.error("Error updating doctor profile:", error)
            setSavingServices(false)
        }
    }

    async function handleUpdateSpecialty() {
        setSavingSpecialty(true)
        const data = {
            specialtyId,
        }
        try{
            await updateDoctorService(profileId, data)
            setSavingSpecialty(false)
            toast.success("Specialty updated successfully")
        }catch (error){
            console.error("Error updating doctor profile:", error)
            setSavingSpecialty(false)
        }
    }

    async function handleUpdateSymptoms() {
        setSavingSymptoms(true)
        const data = {
            symptomIds
        }
        try{
            await updateDoctorService(profileId, data)
            setSavingSymptoms(false)
            toast.success("Symptoms Updated successfully")
        }catch (error){
            console.error("Error updating doctor profile:", error)
            setSavingSymptoms(false)
        }
    }

    async function handleUpdateOperationMode() {
        setSavingOperationMode(true)
        const data = {
            operationMode,
        }
        try{
            await updateDoctorService(profileId, data)
            setSavingOperationMode(false)
            toast.success("Operation Mode updated successfully")
        }catch (error){
            console.error("Error updating doctor profile:", error)
            setSavingOperationMode(false)
        }
    }

    return (
        <div>
            <CardContent className="space-y-4">
                <div className="border shadow rounded-md p-4 mt-4">
                    <div className="sm:col-span-4">
                        <label htmlFor="username" className="scroll-m-20 text-xl font-semibold tracking-tight py-2 mb-3">Update your Hourly Charge</label>
                        <div className="flex justify-between items-center mt-2">
                            <div className="flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
                                <span className="shrink-0 text-base text-gray-500 select-none sm:text-sm/6">GHS </span>
                                <input type="number" name="price" id="price" className="block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6" placeholder="100" />
                            </div>
                            <Button>Update Price</Button>
                        </div>
                    </div>
                </div>

                <div className="border shadow rounded-md p-4 mt-4">
                    <div className="flex items-center justify-between border-b">
                        <h2 className="scroll-m-20 text-xl font-semibold tracking-tight py-2 mb-3">Choose your Mode of Operation.</h2>
                        <Button onClick={handleUpdateOperationMode} disabled={savingOperationMode}>
                            {savingOperationMode ? <span className="flex"><Loader className="mr-2 h-4 w-4 animate-spin" />Please wait...</span> : "Update Operation Mode"}
                        </Button>
                    </div>
                    <div className="grid grid-cols-4 gap-2 py-3">
                        {
                            operationModes?.map((operation) => {
                                const Icon = operation.icon
                                return (
                                    <button key={operation.title} className={cn("flex items-center justify-center flex-col py-3 px-3 border rounded-md cursor-pointer", operationMode === operation.title ? "border-slate-900 border-2 bg-slate-50 dark:bg-slate-950 dark:border-slate-50" : "")} onClick={() => setOperationMode(operation.title)}>
                                        <Icon className="w-8 h-8" />
                                        <p className="text-xs capitalize">{operation.title}</p>
                                    </button>
                                )
                            })
                        }
                    </div>
                </div>

                <div className="border shadow rounded-md p-4 mt-4">
                    <div className="flex items-center justify-between border-b">
                        <h2 className="scroll-m-20 text-xl font-semibold tracking-tight py-2 mb-3">Choose the Service you would want to Offer.</h2>
                        <Button onClick={handleUpdateService} disabled={savingServices}>
                            {savingServices ? <span className="flex"><Loader className="mr-2 h-4 w-4 animate-spin" />Please wait...</span> : "Update Service"}
                        </Button>
                    </div>
                    <div className="grid grid-cols-4 gap-2 py-3">
                        {
                            services?.map((service) => {
                                return (
                                    <button key={service.id} className={cn("flex items-center justify-center flex-col py-3 px-3 border rounded-md cursor-pointer", selectedServiceId === service.id ? "border-slate-900 border-2 bg-slate-50 dark:bg-slate-950 dark:border-slate-50" : "")} onClick={() => setSelectedServiceId(service.id)}>
                                        <Image src={service.imageUrl} alt={service.title} width={100} height={100} className="w-14 h-14" />
                                        <p className="text-xs capitalize">{service.title}</p>
                                    </button>
                                )
                            })
                        }
                    </div>
                </div>

                <div className="border shadow rounded-md p-4">
                    <div className="flex items-center justify-between border-b">
                        <h2 className="scroll-m-20 text-xl font-semibold tracking-tight py-3 mb-3">Choose your Specialty.</h2>
                        <Button onClick={handleUpdateSpecialty} disabled={savingSpecialty}>
                            {savingSpecialty ? <span className="flex"><Loader className="mr-2 h-4 w-4 animate-spin" />Please wait...</span> : "Update Specialty"}
                        </Button>
                    </div>                    
                    <div className="grid grid-cols-4 gap-2 py-3">
                        {
                            specialties?.map((specialty) => {
                                return (
                                    <button key={specialty.id} className={cn("flex items-center justify-center flex-col py-3 px-3 border rounded-md cursor-pointer", specialtyId === specialty.id ? "border-slate-900 border-2 bg-slate-50 dark:bg-slate-950 dark:border-slate-50" : "")} onClick={() => setSpecialtyId(specialty.id)}>
                                        <p className="text-xs capitalize">{specialty.title}</p>
                                    </button>
                                )
                            })
                        }
                    </div>
                </div>

                <div className="border shadow rounded-md p-4">
                    <div className="flex items-center justify-between border-b">
                        <h2 className="scroll-m-20 text-xl font-semibold tracking-tight py-3 mb-3">Choose the Symptoms you would want to attend to.</h2>
                        <Button onClick={handleUpdateSymptoms} disabled={savingSymptoms}>
                            {savingSymptoms ? <span className="flex"><Loader className="mr-2 h-4 w-4 animate-spin" />Please wait...</span> : "Update Symptoms"}
                        </Button>
                    </div>                    
                    <div className="grid grid-cols-4 gap-2 py-3">
                        {
                            symptoms?.map((symptom) => {
                                return (
                                    <button key={symptom.id} className={cn("flex items-center justify-center flex-col py-3 px-3 border rounded-md cursor-pointer", symptomIds.includes(symptom.id) ? "border-slate-900 border-2 bg-slate-50 dark:bg-slate-950 dark:border-slate-50" : "")} onClick={() => setSymptomIds([...symptomIds, symptom.id])}>
                                        <p className="text-xs capitalize">{symptom.title}</p>
                                    </button>
                                )
                            })
                        }
                    </div>
                </div>
            </CardContent>
        </div>
    )
}
