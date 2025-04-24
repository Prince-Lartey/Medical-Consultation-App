"use client"

import Link from 'next/link'
import React from 'react'
import { Pencil, Trash } from 'lucide-react'
import { Symptom } from '@prisma/client'
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
import { deleteSymptom } from '../../../actions/symptoms'

export default function SymptomCard({symptom}: {symptom: Symptom}) {
    const { id, title, slug } = symptom

    async function handleDelete(id: string) {
        await deleteSymptom(id)
        toast.success("Symptom deleted successfully")
    }

    return (
        <div className="border mb-2 border-gray-100 shadow-sm text-sm py-3 px-2 w-full bg-white dark:text-slate-900 rounded-md flex items-center justify-between">
            <div className='flex items-center'>
                <h2 className="capitalize">{title}</h2>
            </div>
            
            <div className="flex items-center gap-2">
                <Link className="text-blue-600" href={`/dashboard/symptoms/update/${slug}`}>
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
                                This action cannot be undone. This will permanently delete the symptom.
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
