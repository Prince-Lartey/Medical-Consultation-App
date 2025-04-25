"use client"

import CustomMultiSelect from '@/components/FormInputs/CustomMultiSelect'
import { SelectOption } from '@/components/FormInputs/SelectInput'
import ShadSelectInput, { SelectOptions } from '@/components/FormInputs/ShadSelectInput'
import { Button } from '@/components/ui/button'
import { CardContent, CardFooter } from '@/components/ui/card'
import { DoctorProfile } from '@prisma/client'
import { Loader } from 'lucide-react'
// import { useSession } from 'next-auth/react'
import React, { useState } from 'react'
import { updateDoctorProfile } from '../../../../actions/onboarding'
import toast from 'react-hot-toast'
import { updateDoctorService } from '../../../../actions/services'

export default function UpdateServiceForm({services, specialties, symptoms, profile}: {services: SelectOptions[], specialties: SelectOptions[], symptoms: SelectOptions[], profile: DoctorProfile}) {
    // const {data: session, status} = useSession()
    // const user = session?.user

    const profileId = profile?.id

    const [selectedServiceId, setSelectedServiceId] = useState()
    const [specialtyId, setSpecialtyId] = useState()
    const [symptomIds, setSymptomIds] = useState<SelectOption[]>([])
    const [loading, setLoading] = useState(false)

    async function handleUpdateService() {
        setLoading(true)
        const data = {
            serviceId: selectedServiceId,
            specialtyId,
            symptomIds: symptomIds.map((symptom) => symptom.value),
        }
        try{
            await updateDoctorService(profileId, data)
            setLoading(false)
            toast.success("Services updated successfully")
        }catch (error){
            console.error("Error updating doctor profile:", error)
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
                <Button onClick={handleUpdateService} disabled={loading}>
                    {loading ? <Loader className="mr-2 h-4 w-4 animate-spin" /> : "Save"}
                </Button>
            </CardFooter>
        </div>
    )
}
