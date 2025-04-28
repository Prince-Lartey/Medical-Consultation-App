import React from 'react'
import {
    Card
} from "@/components/ui/card"
import UpdateServiceForm from './UpdateServiceForm'
import { getServices } from '../../../../actions/services'
import { getSpecialties } from '../../../../actions/specialties'
import { getSymptoms } from '../../../../actions/symptoms'
import { DoctorProfile } from '@prisma/client'

export default async function DoctorServiceSettings({profile}: {profile: DoctorProfile}) {
    const services = (await getServices()).data
    const specialties = (await getSpecialties()).data
    const symptoms = (await getSymptoms()).data

    return (
        <div className="grid gap-6">
            <Card x-chunk="dashboard-04-chunk-1">
                {/* <CardHeader>
                    <CardTitle>Choose Service</CardTitle>
                    <CardDescription>
                        Used to identify your store in the marketplace.
                    </CardDescription>
                </CardHeader> */}
                <UpdateServiceForm services={services} specialties={specialties} symptoms={symptoms} profile={profile}/>
                
            </Card>
        </div>
    )
}
