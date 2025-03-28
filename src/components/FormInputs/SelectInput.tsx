import React from 'react'
import { Label } from '../ui/label';
import { cn } from '@/lib/utils';

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

export default function SelectInput({ multiple = false, label, name, register, className = "col-span-full", options = [] }: SelectInputProps) {
    return (
        <div className={cn("grid gap-2", className)}>
            <Label htmlFor={name} >{label}</Label>
            <select
                id={name}
                name={name}
                {...register(`${name}`)}
                className="w-full border-0 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-slate-700 sm:text-sm rounded-md sm:leading-6"
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
    )
}
