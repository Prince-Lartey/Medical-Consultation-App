import ServiceForm from '@/components/Dashboard/ServiceForm'
import React from 'react'
import { getServiceBySlug } from '../../../../../../../actions/services'

export default async function page({ params }: any) {
    const service = (await getServiceBySlug(params.slug)).data

    return (
        <div>
            {service && service.id && (<ServiceForm title="Update Service" initialData={service} />)}
        </div>
    )
}
