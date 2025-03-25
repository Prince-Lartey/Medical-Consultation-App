import React, { useState } from 'react'
import TextInput from '../FormInputs/TextInput'
import { RegisterInputProps } from '../../../types/types'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import SubmitButton from '../FormInputs/SubmitButton'
import DatePickerInput from '../FormInputs/DatePickerInput'

export default function BioDataForm() {
    const {register, handleSubmit, reset, formState: { errors }} = useForm<RegisterInputProps>()
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()
    const [date, setDate] = useState<Date>()

    async function onSubmit(data: RegisterInputProps) {
        setIsLoading(true)   
        
    }

    return (
        <div className="w-full">
            <div className="text-center border-b border-gray-200 pb-4">
                <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">Bio Data</h1>
                <p className="text-balance text-muted-foreground">
                    Enter your details below to create a new account
                </p>
            </div>
            <form className="py-4 px-4 mx-auto " onSubmit={handleSubmit(onSubmit)}>
                <div className="grid grid-cols-2 gap-4">
                    <TextInput 
                        label="First Name"
                        register={register}
                        name="fullName"
                        type="text"
                        errors={errors}
                        placeholder="eg: Prince "
                    />
                    <TextInput 
                        label="Last Name"
                        register={register}
                        name="fullName"
                        type="text"
                        errors={errors}
                        placeholder="eg: Lartey"
                    />
                    <TextInput 
                        label="Middle Name (Optional)"
                        register={register}
                        name="fullName"
                        type="text"
                        errors={errors}
                        placeholder="eg: Kofi"
                    />
                    <div className="">
                        <DatePickerInput date={date} setDate={setDate}/>
                    </div>
                    <TextInput 
                        label="Phone Number"
                        register={register}
                        name="phone"
                        type="phone"
                        errors={errors}
                        placeholder="eg: +233 54 123 4567"
                        className="col-span-full sm:col-span-1"
                    />
                    <TextInput 
                        label="Phone Number"
                        register={register}
                        name="phone"
                        type="phone"
                        errors={errors}
                        placeholder="eg: +233 54 123 4567"
                        className="col-span-full sm:col-span-1"
                    />
                    <TextInput 
                        label="Phone Number"
                        register={register}
                        name="phone"
                        type="phone"
                        errors={errors}
                        placeholder="eg: +233 54 123 4567"
                        className="col-span-full sm:col-span-1"
                    />
                </div>
                
                <div className="flex justify-center items-center mt-8">
                    <SubmitButton title="Save and Continue" buttonType="submit" loadingTitle="Please wait..." isLoading={isLoading}/>
                </div>
            </form>
        </div>
    )
}
