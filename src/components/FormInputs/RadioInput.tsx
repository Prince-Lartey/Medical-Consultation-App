import React from 'react'
import { Label } from '../ui/label';
import { cn } from '@/lib/utils';

type RadioInputProps = {
    label: string;
    className?: string
    name: string
    register: any;
    errors: any;
    radioOptions: RadioOption[]
}

export type RadioOption = {
    label: string;
    value: string;
}

export default function RadioInput({label, register, className="col-span-full", name, errors, radioOptions}: RadioInputProps) {

    return (
        <div className={cn("grid gap-2", className)}>
            <Label>{label}</Label>
            <ul className="items-center w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg sm:flex dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                {
                    radioOptions.map((item, index) => {
                        return (
                            <li key={index} className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                                <div className="flex items-center ps-3">
                                    <input id={item.value} type="radio" value={item.value} name={`${name}`} {...register(`${name}`, {required: true})} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"/>
                                    <label htmlFor={item.value} className="w-full py-2 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">{item.label}</label>
                                </div>
                            </li>
                        )
                    })
                }
            </ul>
            {errors[`${name}`] && <span className="text-red-500 text-sm">{label} is required</span>}
        </div>
    )
}
