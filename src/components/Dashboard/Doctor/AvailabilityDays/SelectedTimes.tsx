import { Button } from '@/components/ui/button'
import { Loader, Plus, X } from 'lucide-react'
import React from 'react'

type SelectedProps = {
    handleAddAll: () => void
    timesArray: string[]
    handleAddTime: (time: string) => void
    handleRemoveTime: (index: number) => void
    selectedTimes: string[]
    ClearAll: () => void
    handleSubmit: () => void
    loading: boolean
    day: string
}

export default function SelectedTimes({handleAddAll, timesArray, handleAddTime, handleRemoveTime, selectedTimes, ClearAll, handleSubmit, loading, day}: SelectedProps) {
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
                <h2 className="font-semibold">Here is your Selected time for <span className="capitalize">{day}</span></h2>
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
                
                <div className="border-t border-gray-200 pt-4 flex justify-between">
                    {
                        loading ? (
                            <Button disabled><Loader className="animate-spin w-4 h-4"/>Please Wait ...</Button>
                        ) : (
                            <Button onClick={handleSubmit}>Save Settings</Button>
                        )
                    }
                    {selectedTimes.length > 0 && (
                        <button className="flex items-center py-2 px-2 border border-red-300 rounded-md text-sm justify-center" onClick={ClearAll}>
                            <span>Clear All</span>
                            <X className="w-3 h-3 ml-2"/>
                        </button>
                    )}
                </div>
            </div>
        </div>
    )
}
