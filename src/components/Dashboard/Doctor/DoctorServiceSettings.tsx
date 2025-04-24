import React from 'react'
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import UpdateServiceForm from './UpdateServiceForm'
import { getServices } from '../../../../actions/services'
import { getSpecialties } from '../../../../actions/specialties'
import { getSymptoms } from '../../../../actions/symptoms'
import { SelectOption } from '@/components/FormInputs/SelectInput'

export default async function DoctorServiceSettings() {
    const allServices = (await getServices()).data
    const allSpecialties = (await getSpecialties()).data
    const allSymptoms = (await getSymptoms()).data

    const services: SelectOption[] = allServices?.map((service: any) => {
        return {
            label: service.title,
            value: service.id,
        }
    }) || []

    const specialties: SelectOption[] = allSpecialties?.map((specialty: any) => {
        return {
            label: specialty.title,
            value: specialty.id,
        }
    }) || []

    const symptoms: SelectOption[] = allSymptoms?.map((symptom: any) => {
        return {
            label: symptom.title,
            value: symptom.id,
        }
    }) || []

    return (
        <div className="grid gap-6">
            <Card x-chunk="dashboard-04-chunk-1">
                <CardHeader>
                    <CardTitle>Choose Service</CardTitle>
                    <CardDescription>
                        Used to identify your store in the marketplace.
                    </CardDescription>
                </CardHeader>
                <UpdateServiceForm services={services} specialties={specialties} symptoms={symptoms} />
                
            </Card>
        </div>
    )
}
