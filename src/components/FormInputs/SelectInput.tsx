import React from 'react'
import { Label } from '../ui/label';

type SelectInputProps = {
    name: string;
    label: string;
    register: any;
    className?: string;
    options: SelectOption[];
    multiple?: boolean;
}

export type SelectOption = {
    label: string;
    value: string;
}

export default function SelectInput({ multiple = false, label, name, register, className = "sm:col-span-2", options = [] }: SelectInputProps) {
    return (
        <div className={className}>
            <Label htmlFor={name} >{label}</Label>
            <div className="mt-2">
                <select
                    id={name}
                    name={name}
                    {...register(`${name}`)}
                    className="block w-full border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm rounded-md sm:leading-6"
                    multiple={multiple}
                >
                    {
                        options.map((option, index: number) => {
                            return (
                                <option key={index} value={option.value}>{option.label}</option>
                            )
                        })
                    }
                </select>
            </div>
            
        </div>
    )
}
