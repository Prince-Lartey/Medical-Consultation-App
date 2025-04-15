import SubmitButton from '@/components/FormInputs/SubmitButton'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import React, { useState } from 'react'

export default function Monday() {
    const timesArray = [
        "7:00 AM", "8:00 AM", "9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM", "6:00 PM",
    ]
    const [selectedTimes, setSelectedTimes] = useState(["7:00 AM", "8:00 AM", "9:00 AM", "10:00 AM",])
    const [loading, setLoading] = useState(false)

    function handleAddTime(time: string) {
        setSelectedTimes((prevTimes) => [...prevTimes, time])
    }

    return (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 border-gray-200 dark:border-gray-600 shadow rounded-md divide-x divide-gray-200">
            <div className="p-4">
                <h2 className="font-semibold">Select the Times You are Available for this Day</h2>
                <div className="py-6 grid grid-cols-3 gap-3">
                    {
                        timesArray.map((time, index) => {
                            return (
                                <button key={index} className="flex items-center py-2 px-2 border border-gray-100 rounded-md text-sm justify-center">
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
                                    <Plus className="w-3 h-3 ml-2"/>
                                </button>
                            )
                        })
                    }
                    
                </div>
                <div className="border-t border-gray-200 pt-4">
                    <SubmitButton title="Save Settings" isLoading={loading} loadingTitle="Please Wait..." />
                </div>
            </div>
        </div>
    )
}
