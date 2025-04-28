"use client"

import { Button } from '@/components/ui/button'
import { CardContent } from '@/components/ui/card'
import { DoctorProfile, Service, Specialty, Symptom } from '@prisma/client'
import { Loader } from 'lucide-react'
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

    const [savingServices, setSavingServices] = useState(false)
    const [savingSpecialty, setSavingSpecialty] = useState(false)
    const [savingSymptoms, setSavingSymptoms] = useState(false)

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

    return (
        <div>
            <CardContent className="space-y-4">
                <div className="border shadow rounded-md p-4 mt-4">
                    <div className="flex items-center justify-between border-b">
                        <h2 className="scroll-m-20 text-xl font-semibold tracking-tight py-2 mb-3">Choose the Service you would want to Offer.</h2>
                        <Button onClick={handleUpdateService} disabled={savingServices}>
                            {savingServices ? <Loader className="mr-2 h-4 w-4 animate-spin" /> : "Update Service"}
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
                            {savingSpecialty ? <Loader className="mr-2 h-4 w-4 animate-spin" /> : "Update Specialty"}
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
                            {savingSymptoms ? <Loader className="mr-2 h-4 w-4 animate-spin" /> : "Update Symptoms"}
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
