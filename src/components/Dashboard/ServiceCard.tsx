import Link from 'next/link'
import React from 'react'
import { ServiceProps } from '../../../types/types'
import Image from 'next/image'
import { Pencil, Trash } from 'lucide-react'

export default function ServiceCard({service}: {service: ServiceProps}) {
    const { title, slug, imageUrl } = service

    return (
        <div className="border mb-2 border-gray-100 shadow-sm text-xs py-3 px-2 w-full bg-white dark:text-slate-900 rounded-md flex items-center justify-between">
            <div className='flex items-center gap-5'>
                <Image src={imageUrl} alt={title} width={512} height={512} className="w-14 h-auto" />
                <h2 className="capitalize">{title}</h2>
            </div>
            
            <div className="flex items-center gap-2">
                <Link className="text-blue-600" href={`/dashboard/services/update/${slug}`}>
                    <Pencil className="w-4 h-4" />
                </Link>

                <button className="text-red-600" >
                    <Trash className="w-4 h-4" />
                </button>
            </div>
        </div>
    )
}
