import React from 'react'
import { getSpecialtyBySlug } from '../../../../../../../actions/specialties'
import SpecialtyForm from '@/components/Dashboard/SpecialtyForm'

export default async function page({params}: {params: Promise<{ slug: string }>;}) {
    const { slug } = await params
    const specialty = (await getSpecialtyBySlug(slug)).data

    return (
        <div>
            {specialty && specialty.id && (<SpecialtyForm title="Update Specialty" initialData={specialty} />)}
        </div>
    )
}
