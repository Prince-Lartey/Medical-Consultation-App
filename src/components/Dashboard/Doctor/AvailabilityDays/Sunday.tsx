import { Button } from '@/components/ui/button'
import { Loader, Plus, X } from 'lucide-react'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { createAvailability, updateAvailabilityById } from '../../../../../actions/onboarding'

export default function Sunday({profile}: {profile: any}) {
    const timesArray = [
        "7:00 AM", "8:00 AM", "9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM", "6:00 PM",
    ]
    const [selectedTimes, setSelectedTimes] = useState(["7:00 AM", "8:00 AM", "9:00 AM",])
    const [loading, setLoading] = useState(false)

    const availability = profile?.availability || "" 

    function handleAddTime(time: string) {
        if (!selectedTimes.includes(time)) {
            setSelectedTimes((prevTimes) => [...prevTimes, time])
        }else {
            toast.error(`${time} already added!`)
        }
    }

    function handleRemoveTime(index: number) {
        const updatedTime = selectedTimes.filter((_, i) => i !==index )
        setSelectedTimes(updatedTime)
    }

    function handleAddAll() {
        setSelectedTimes([...timesArray])
    }

    function ClearAll() {
        setSelectedTimes([])
    }

    async function handleSubmit() {
        setLoading(true)
        try {
            if (profile?.id && availability?.id) {
                const data = {
                    sunday: selectedTimes,
                    doctorProfileId: profile.id
                }
                await updateAvailabilityById(availability?.id, data)
                toast.success("Sunday Availability Saved")
                setLoading(false)
                console.log(data)
            }else if (profile?.id) {
                const data = {
                    sunday: selectedTimes,
                    doctorProfileId: profile.id
                }
                await createAvailability(data)
                toast.success("Sunday Availability Saved")
                setLoading(false)
            }else {
                toast.error("Error Saving Sunday Availability")
                setLoading(false)
            }
        }catch {
            toast.error("Error Saving Sunday Availability")
            setLoading(false)
        }
    }

    return (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 border-gray-200 dark:border-gray-600 shadow rounded-md divide-x divide-gray-200">
            <div className="p-4">
                <h2 className="font-semibold">Select the Times You are Available for this Day</h2>
                <div className="py-6 grid grid-cols-3 gap-3">
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
                <div className="border-t border-gray-200 pt-4 flex justify-between">
                    <button className="flex items-center py-2 px-2 border border-gray-300 rounded-md text-sm justify-center" onClick={handleAddAll}>
                        <span>Add All</span>
                        <Plus className="w-3 h-3 ml-2"/>
                    </button>
                </div>
            </div>
            <div className="p-4">
                <h2 className="font-semibold">Here is your Selected time for this Day</h2>
                <div className="py-6 grid grid-cols-3 gap-3">
                    {
                        selectedTimes.map((time, index) => {
                            return (
                                <button key={index} className="flex items-center py-2 px-2 border border-blue-500 bg-blue-100 rounded-md text-sm justify-center" onClick={() => handleRemoveTime(index)}>
                                    <span>{time}</span>
                                    <X className="w-3 h-3 ml-2 text-red-500" />
                                </button>
                            )
                        })
                    }
                    
                </div>
                {
                    selectedTimes.length > 0 && (
                        <div className="border-t border-gray-200 pt-4 flex justify-between">
                            {
                                loading ? (
                                    <Button disabled><Loader className="animate-spin w-4 h-4"/>Please Wait ...</Button>
                                ) : (
                                    <Button onClick={handleSubmit}>Save Settings</Button>
                                )
                            }
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
