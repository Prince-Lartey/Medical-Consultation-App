import SubmitButton from '@/components/FormInputs/SubmitButton'
import { Button } from '@/components/ui/button'
import { DoctorProfile } from '@prisma/client'
import { Plus, X } from 'lucide-react'
import React, { useState } from 'react'
import toast from 'react-hot-toast'

export default function Monday({profile}: {profile: DoctorProfile | undefined | null}) {
    const timesArray = [
        "7:00 AM", "8:00 AM", "9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM", "6:00 PM",
    ]
    const [selectedTimes, setSelectedTimes] = useState(["7:00 AM", "8:00 AM", "9:00 AM", "10:00 AM",])
    const [loading, setLoading] = useState(false)

    function handleAddTime(time: string) {
        if (!selectedTimes.includes(time)) {
            setSelectedTimes((prevTimes) => [...prevTimes, time])
        }else {
            toast.error(`${time} already added!`)
        }
    }

    function handleAddAll() {
        setSelectedTimes([...timesArray])
    }

    function ClearAll() {
        setSelectedTimes([])
    }

    function handleSubmit() {
        if (profile?.id) {
            const data = {
                monday: selectedTimes,
                doctorProfileId: profile.id
            }
            console.log(data)
        }else {
            console.log("id not found")
        }
    }

    return (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 border-gray-200 dark:border-gray-600 shadow rounded-md divide-x divide-gray-200">
            <div className="p-4">
                <h2 className="font-semibold">Select the Times You are Available for this Day</h2>
                <div className="py-6 grid grid-cols-3 gap-3">
                    <button className="flex items-center py-2 px-2 border border-gray-300 rounded-md text-sm justify-center" onClick={handleAddAll}>
                        <span>Add All</span>
                        <Plus className="w-3 h-3 ml-2"/>
                    </button>
                    {
                        timesArray.map((time, index) => {
                            return (
                                <button key={index} className="flex items-center py-2 px-2 border border-gray-100 rounded-md text-sm justify-center" onClick={() => handleAddTime(time)}>
                                    <span>{time}</span>
                                    <Plus className="w-3 h-3 ml-2"/>
                                </button>
                            )
                        })
                    }
                </div>
            </div>
            <div className="p-4">
                <h2 className="font-semibold">Here is your Selected time for this Day</h2>
                <div className="py-6 grid grid-cols-3 gap-3">
                    {
                        selectedTimes.map((time, index) => {
                            return (
                                <button key={index} className="flex items-center py-2 px-2 border border-blue-500 bg-blue-100 rounded-md text-sm justify-center">
                                    <span>{time}</span>
                                </button>
                            )
                        })
                    }
                    
                </div>
                {
                    selectedTimes.length > 0 && (
                        <div className="border-t border-gray-200 pt-4 flex justify-between">
                            <Button onClick={handleSubmit}>Save Settings</Button>
                            <button className="flex items-center py-2 px-2 border border-red-300 rounded-md text-sm justify-center" onClick={ClearAll}>
                                <span>Clear All</span>
                                <X className="w-3 h-3 ml-2"/>
                            </button>
                        </div>
                    )
                }
            </div>
        </div>
    )
}
