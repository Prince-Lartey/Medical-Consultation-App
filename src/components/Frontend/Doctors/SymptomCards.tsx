import { Symptom } from '@prisma/client'
import Link from 'next/link'
import React from 'react'

export default function SymptomCards({className, symptoms}: {className?: string, symptoms?: Symptom[]}) {
    return (
        <div className="grid lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-2 grid-col-1 gap-6">
            {
                symptoms?.map((symptom, index) => {
                    return (
                        <Link key={index} href={`/symptoms/${symptom.slug}?id=${symptom.id}`} className={`rounded-md py-3 px-6 flex gap-4 bg-slate-800 text-slate-50 justify-between items-center ${className}`}>
                            <h2 className="text-sm capitalize">{symptom.title}</h2>
                            <span aria-hidden="true">&rarr;</span>
                        </Link>
                    )
                })
            }
        </div>
        
    )
}
