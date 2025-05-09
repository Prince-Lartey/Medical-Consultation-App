import ServiceForm from '@/components/Dashboard/ServiceForm'
import React from 'react'
import { getServiceBySlug } from '../../../../../../../actions/services'

export default async function page({params}: {params: Promise<{ slug: string }>;}) {
    const { slug } = await params
    const service = (await getServiceBySlug(slug)).data

    return (
        <div>
            {service && service.id && (<ServiceForm title="Update Service" initialData={service} />)}
        </div>
    )
}
