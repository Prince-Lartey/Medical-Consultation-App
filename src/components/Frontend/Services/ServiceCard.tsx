import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Service } from '@prisma/client'

export default function ServiceCard({service}: {service: Service}) {
    return (
        <Link href={`/services/${service.slug}`} className='rounded-md bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 duration-300 flex gap-4 overflow-hidden '>
            <Image src={service.imageUrl} width={512} height={512} alt={service.title} className="w-1/3 object-contain aspect-video px-1"/>
            <div className="flex flex-col w-2/3 py-4">
                <h2 className="text-sm capitalize font-semibold">{service.title}</h2>
                <p className="text-[0.6rem]">1000 Doctors Available</p>
            </div>
        </Link>
    )
}
