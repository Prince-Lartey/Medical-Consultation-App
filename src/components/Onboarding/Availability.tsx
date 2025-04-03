"use client"

import React, { useState } from 'react'
import TextInput from '../FormInputs/TextInput'
import { BioDataFormProps } from '../../../types/types'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import SubmitButton from '../FormInputs/SubmitButton'
import RadioInput from '../FormInputs/RadioInput'
import toast from 'react-hot-toast'
import { Checkbox } from '../ui/checkbox'
import { Label } from '../ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { Plus } from 'lucide-react'
import { StepFormProps } from './BioDataForm'

export default function Availability({ page, title, description }: StepFormProps) {
    const {register, handleSubmit, reset, formState: { errors }} = useForm<BioDataFormProps>()
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()

    const availabilityOptions = [
        { label: 'Weekly (You are available for one or more times during the week, every week)', value: 'weekly' },
        { label: 'Specific Dates (You are only available on specific dates)', value: 'specific' },
    ]

    async function onSubmit(data: BioDataFormProps) {

        data.page = page
        console.log(data)
    }

    return (
        <div className="w-full">
            <div className="text-center border-b border-gray-200 pb-4">
                <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">{title}</h1>
                <p className="text-balance text-muted-foreground">
                    {description}
                </p>
            </div>
            <form className="py-4 px-4 mx-auto " onSubmit={handleSubmit(onSubmit)}>
                <div className="grid grid-cols-2 gap-4">
                    <TextInput 
                        label="What is the Duration for your Meetings?"
                        register={register}
                        name="meetingDuration"
                        type="number"
                        errors={errors}
                        className="col-span-full sm:col-span-1"
                    />

                    <RadioInput label="When are you available for meetings?" name="availabiltyType" register={register} errors={errors} radioOptions={availabilityOptions} />

                    <div className="col-span-full">
                        <Label>Define your weekly availability below</Label>
                        <div className="border py-6 px-4 border-gray-200 flex items-center justify-between">
                            {/* Checkbox */}
                            <div className="mr-5">
                                <div className="flex items-center space-x-2">
                                    <Checkbox id="day" />
                                    <label htmlFor="day" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                        Monday
                                    </label>
                                </div>
                            </div>
                            {/* Time */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="grid grid-cols-3 gap-2">
                                    <Select>
                                        <SelectTrigger id="month">
                                            <SelectValue placeholder="8" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {Array.from({ length: 12 }, (_, i) => (
                                                <SelectItem key={i} value={`${(i + 1).toString().padStart(2, '0')}`}>
                                                    {(i + 1).toString().padStart(2, '0')}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <Select>
                                        <SelectTrigger id="year">
                                            <SelectValue placeholder="00" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {Array.from({ length: 59 }, (_, i) => (
                                                <SelectItem key={i} value={`${(i + 1).toString().padStart(2, '0')}`}>
                                                    {(i + 1).toString().padStart(2, '0')}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <Select>
                                        <SelectTrigger id="year">
                                            <SelectValue placeholder="AM" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="am">AM</SelectItem>
                                            <SelectItem value="pm">PM</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                
                                <div className="grid grid-cols-3 gap-2">
                                    <Select>
                                        <SelectTrigger id="month">
                                            <SelectValue placeholder="8" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {Array.from({ length: 12 }, (_, i) => (
                                                <SelectItem key={i} value={`${(i + 1).toString().padStart(2, '0')}`}>
                                                    {(i + 1).toString().padStart(2, '0')}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <Select>
                                        <SelectTrigger id="year">
                                            <SelectValue placeholder="00" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {Array.from({ length: 59 }, (_, i) => (
                                                <SelectItem key={i} value={`${(i + 1).toString().padStart(2, '0')}`}>
                                                    {(i + 1).toString().padStart(2, '0')}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <Select>
                                        <SelectTrigger id="year">
                                            <SelectValue placeholder="AM" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="am">AM</SelectItem>
                                            <SelectItem value="pm">PM</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                            {/* Add window */}
                            <Button variant="ghost">
                                <Plus className="w-5 h-5 flex-shrink-0"/>
                                Add Window
                            </Button>
                        </div>
                    </div>
                </div>
                
                <div className="flex justify-center items-center mt-8">
                    <SubmitButton title="Save and Continue" buttonType="submit" loadingTitle="Please wait..." isLoading={isLoading}/>
                </div>
            </form>
        </div>
    )
}
