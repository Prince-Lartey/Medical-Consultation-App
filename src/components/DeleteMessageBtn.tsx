"use client"

import React, { useState } from 'react'
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { Button } from './ui/button'
import { Loader2, Trash2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { deleteMessage } from '../../actions/inbox'
import { UserRole } from '@prisma/client'
import toast from 'react-hot-toast'

export default function DeleteMessageBtn({id, role}: {id: string | undefined, role: UserRole | undefined}) {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)

    async function handleDelete() {
        setIsLoading(true)
        try {
            const res = await deleteMessage(id as string)
            if(res.ok){
                setIsLoading(false)
                toast.success("Message deleted")
                router.replace(role === "DOCTOR" ? "/dashboard/doctor/inbox" : "/dashboard/user/inbox")
            }
        } catch (error) {
            setIsLoading(false)
            console.log(error)
        }
    }

    return (
        <div>
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger asChild>
                        {isLoading ? (
                            <Button variant="ghost" size="icon">
                                <Loader2 className="h-4 w-4 animate-spin" />
                            </Button>
                        ) : (
                            <Button variant="ghost" size="icon" onClick={handleDelete}>
                                <Trash2 className="h-4 w-4" />
                                <span className="sr-only">Delete Message</span>
                            </Button>
                        )}
                    </TooltipTrigger>
                    <TooltipContent>{isLoading ? "Deleting" : "Delete Message"}</TooltipContent>
                </Tooltip>
            </TooltipProvider>
        </div>
    )
}
