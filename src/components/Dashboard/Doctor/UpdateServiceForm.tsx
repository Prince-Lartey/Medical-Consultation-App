"use client"

import CustomMultiSelect from '@/components/FormInputs/CustomMultiSelect'
import { SelectOption } from '@/components/FormInputs/SelectInput'
import ShadSelectInput, { SelectOptions } from '@/components/FormInputs/ShadSelectInput'
import { Button } from '@/components/ui/button'
import { CardContent, CardFooter } from '@/components/ui/card'
import { DoctorProfile } from '@prisma/client'
import { Loader } from 'lucide-react'
import { useSession } from 'next-auth/react'
import React, { useState } from 'react'

export default function UpdateServiceForm({services, specialties, symptoms, profile}: {services: SelectOptions[], specialties: SelectOptions[], symptoms: SelectOptions[], profile: DoctorProfile}) {
    const {data: session, status} = useSession()
    const user = session?.user

    const profileId = profile?.id

    const [selectedServiceId, setSelectedServiceId] = useState()
    const [specialtyId, setSpecialtyId] = useState()
    const [symptomIds, setSymptomIds] = useState<SelectOption[]>([])

    if(status === "loading") {
        return (
            <div className="flex items-center justify-center space-y-2 space-x-2">
                <Loader className="w-4 h-4 mr-1 animate-spin" />
                <span>Loading User...</span>
            </div>
        )
    }

    function handleUpdateService() {
        const data = {
            serviceId: selectedServiceId,
            specialtyId,
            symptomIds: symptomIds.map((symptom) => symptom.value),
            profileId,
        }
        console.log(data)
    }

    return (
        <div>
            <CardContent className="space-y-4">
                <ShadSelectInput label="Select Service" optionTitle="Service" className="" options={services} selectedOptions={selectedServiceId} setSelectedOptions={setSelectedServiceId} />
                <ShadSelectInput label="Select Specialty" optionTitle="Specialty" className="" options={specialties} selectedOptions={specialtyId} setSelectedOptions={setSpecialtyId} />
                <CustomMultiSelect label="Select Symptom" optionTitle="Symptom" className="" options={symptoms} selectedOptions={symptomIds} setSelectedOptions={setSymptomIds} />
            </CardContent>
            <CardFooter className="border-t px-6 py-4">
                <Button onClick={handleUpdateService}>Save</Button>
            </CardFooter>
        </div>
    )
}
