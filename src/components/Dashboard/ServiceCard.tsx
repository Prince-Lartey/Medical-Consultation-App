"use client"

import Link from 'next/link'
import React from 'react'
import Image from 'next/image'
import { Pencil, Trash } from 'lucide-react'
import { deleteService } from '../../../actions/services'
import { Service } from '@prisma/client'
import toast from 'react-hot-toast'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

export default function ServiceCard({service}: {service: Service}) {
    const { id, title, slug, imageUrl } = service

    async function handleDelete(id: string) {
        await deleteService(id)
        toast.success("Specialty deleted successfully")
    }

    return (
        <div className="border mb-2 border-gray-100 shadow-sm text-xs py-3 px-2 w-full bg-white dark:text-slate-900 rounded-md flex items-center justify-between">
            <div className='flex items-center gap-5'>
                {imageUrl && (
                    <Image src={imageUrl} alt={title} width={512} height={512} className="w-14 h-auto" />
                )}
                <h2 className="capitalize">{title}</h2>
            </div>
            
            <div className="flex items-center gap-2">
                <Link className="text-blue-600" href={`/dashboard/services/update/${slug}`}>
                    <Pencil className="w-4 h-4" />
                </Link>
                <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <button className="text-red-600">
                            <Trash className="w-4 h-4" />
                        </button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle className="text-red-600">Are you absolutely sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                                This action cannot be undone. This will permanently delete the service.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={() => handleDelete(id)}>Delete</AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </div>
        </div>
    )
}
