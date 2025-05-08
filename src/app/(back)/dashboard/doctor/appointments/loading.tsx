import React from 'react'
import { Skeleton } from '@/components/ui/skeleton'

export default function Loading() {
    return (
        <div className=" p-6">
            <div className="space-y-6">
                <div className="flex justify-end">
                    <Skeleton className="h-8 w-32" />
                </div>
                <Skeleton className="h-32 w-full rounded-xl" />
            </div>
        </div>
    )
}
