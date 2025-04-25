"use client"

import * as React from "react"
import { Label } from '../ui/label';
import { cn } from "@/lib/utils"
import DatePicker from 'react-date-picker';
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';

type DatePickerInputProps = {
    date: Date | undefined
    setDate: any
    className?: string
    title: string
}

export default function DatePickerInput({date, setDate, className="col-span-full", title}: DatePickerInputProps) {

    return (
        <div className={cn("grid gap-2", className)}>
            <Label>{title}</Label>
            <DatePicker onChange={setDate} value={date} className="z-50 rounded-md border border-slate-300 dark:border-slate-600 ring-0 py-1 px-3"/>
        </div>
    )
}
