import React from 'react'
import { getSymptomBySlug } from '../../../../../../../actions/symptoms'
import SymptomForm from '@/components/Dashboard/SymptomForm'

export default async function page({ params: {slug}, }: {params: {slug: string}}) {
    const symptom = (await getSymptomBySlug(slug)).data

    return (
        <div>
            {symptom && symptom.id && (<SymptomForm title="Update Symptom" initialData={symptom} />)}
        </div>
    )
}
