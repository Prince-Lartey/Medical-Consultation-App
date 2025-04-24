"use client"

import CustomMultiSelect from '@/components/FormInputs/CustomMultiSelect'
import ShadSelectInput, { SelectOptions } from '@/components/FormInputs/ShadSelectInput'
import { Button } from '@/components/ui/button'
import { CardContent, CardFooter } from '@/components/ui/card'
import React, { useState } from 'react'

export default function UpdateServiceForm({services, specialties, symptoms,}: {services: SelectOptions[], specialties: SelectOptions[], symptoms: SelectOptions[]}) {
    const [selectedServiceId, setSelectedServiceId] = useState()
    const [specialtyId, setSpecialtyId] = useState()
    const [symptomIds, setSymptomIds] = useState([])

    return (
        <div>
            <CardContent className="space-y-4">
                <ShadSelectInput label="Select Service" optionTitle="Service" className="" options={services} selectedOptions={selectedServiceId} setSelectedOptions={setSelectedServiceId} />
                <ShadSelectInput label="Select Specialty" optionTitle="Specialty" className="" options={specialties} selectedOptions={specialtyId} setSelectedOptions={setSpecialtyId} />
                <CustomMultiSelect label="Select Symptom" optionTitle="Symptom" className="" options={symptoms} selectedOptions={symptomIds} setSelectedOptions={setSymptomIds} />
            </CardContent>
            <CardFooter className="border-t px-6 py-4">
                <Button>Save</Button>
            </CardFooter>
        </div>
    )
}
