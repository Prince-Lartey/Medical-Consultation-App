import React from 'react'
import ServiceCard from './ServiceCard'
import { ServiceWithDoctorProfileCount } from '../../../../actions/services'

export default function ServiceList({ data }: {data: ServiceWithDoctorProfileCount[]}) {
    return (
        <div className='grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-col-1 gap-4'>
            {data.map((service, index) => (
                <ServiceCard key={index} service={service} />
            ))}
        </div>
    )
}
