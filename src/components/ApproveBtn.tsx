"use client"

import { cn } from '@/lib/utils'
import { DoctorStatus } from '@prisma/client'
import React, { useState } from 'react'
import { updateDoctorProfile } from '../../actions/onboarding'
import toast from 'react-hot-toast'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import ShadSelectInput from './FormInputs/ShadSelectInput'
import { Button } from './ui/button'
import { Loader } from 'lucide-react'

export default function ApproveBtn({status, profileId}: {status: DoctorStatus | undefined, profileId: string | undefined}) {
    const options = [
        {
            label: "pending",
            value: "pending"
        },
        {
            label: "approved",
            value: "approved"
        },
        {
            label: "rejected",
            value: "rejected"
        },
    ]
    const initialOption = status
    const [selectedOption, setSelectedOption] = useState(initialOption)
    const [loading, setLoading] = useState(false)

    async function updateStatus() {
        setLoading(true)
        const data = {
            status: selectedOption
        }
        try {
            const res = await updateDoctorProfile(profileId, data)
            if(res?.status === 201) {
                toast.success("Doctor Status Changed")
                setLoading(false)
                window.location.reload()
            }
        } catch (error) {
            setLoading(false)
            console.log(error)
        }
    }

    return (
        <Dialog>
            <DialogTrigger>
                <button className={cn("py-1.5 px-3 rounded-md text-sm uppercase font-medium text-white", status === "approved" ? "bg-green-500" : status === "pending" ? "bg-yellow-500" : "bg-red-500")}>
                    {status}
                </button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                <DialogTitle>Change Doctor Status</DialogTitle>
                <DialogDescription>
                    <div className="py-4">
                        <ShadSelectInput 
                            label="Status"
                            optionTitle="Status"
                            options={options}
                            selectedOptions={selectedOption} 
                            setSelectedOptions={setSelectedOption}
                        />
                    </div>
                    <DialogFooter>
                        {loading ? (
                            <Button disabled>
                                <Loader className="mr-2 w-4 h-4" />
                                loading..
                            </Button>
                        ) : (
                            <Button type="submit" onClick={updateStatus}>Save changes</Button>
                        )}
                    </DialogFooter>
                </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>

        
    )
}
