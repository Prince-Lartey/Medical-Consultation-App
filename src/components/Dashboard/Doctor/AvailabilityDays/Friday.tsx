import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { createAvailability, updateAvailabilityById } from '../../../../../actions/onboarding'
import SelectedTimes from './SelectedTimes'
import { timesArray } from '../../../../../config/constants'

export default function Friday({profile, day}: {profile: any, day: string}) {
    const initialData: string[] = profile?.availability[day] || []
    
    const [selectedTimes, setSelectedTimes] = useState<string[]>(initialData)
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
                    friday: selectedTimes,
                    doctorProfileId: profile.id
                }
                await updateAvailabilityById(availability?.id, data)
                toast.success("Friday Availability Saved")
                setLoading(false)
                // console.log(data)
            }else if (profile?.id) {
                const data = {
                    friday: selectedTimes,
                    doctorProfileId: profile.id
                }
                await createAvailability(data)
                toast.success("Friday Availability Saved")
                setLoading(false)
            }else {
                toast.error("Error Saving Friday Availability")
                setLoading(false)
            }
        }catch {
            toast.error("Error Saving Friday Availability")
            setLoading(false)
        }
    }

    return (
        <SelectedTimes handleAddAll={handleAddAll} timesArray={timesArray} handleAddTime={handleAddTime} selectedTimes={selectedTimes} handleRemoveTime={handleRemoveTime} handleSubmit={handleSubmit} ClearAll={ClearAll} loading={loading} day={day}/>
    )
}
