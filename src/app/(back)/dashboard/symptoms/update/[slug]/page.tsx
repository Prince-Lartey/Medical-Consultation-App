import React from 'react'
import { getSymptomBySlug } from '../../../../../../../actions/symptoms'
import SymptomForm from '@/components/Dashboard/SymptomForm'

export default async function page({ params }: any) {
    const symptom = (await getSymptomBySlug(params.slug)).data

    return (
        <div>
            {symptom && symptom.id && (<SymptomForm title="Update Symptom" initialData={symptom} />)}
        </div>
    )
}
