import React from 'react'
import ServiceCard from './ServiceCard'
import { Service } from '@prisma/client'

export default function ServiceList({ data }: {data: Service[]}) {
    return (
        <div className='grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-col-1 gap-4'>
            {data.map((service, index) => (
                <ServiceCard key={index} service={service} />
            ))}
        </div>
    )
}
