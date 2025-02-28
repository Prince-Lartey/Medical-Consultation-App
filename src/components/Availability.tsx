"use client"

import React from 'react'
import { Calendar } from "@/components/ui/calendar"
// import Link from 'next/link'

export default function Availability() {
    const [bookDate, setBookDate] = React.useState<Date | undefined>(new Date())

    const timeStamps = [
        {
            time: "8:30",
            period: "AM"
        },
        {
            time: "9:30",
            period: "AM"
        },
        {
            time: "10:30",
            period: "AM"
        },
        {
            time: "11:30",
            period: "AM"
        },
        {
            time: "12:30",
            period: "PM"
        },
        {
            time: "1:30",
            period: "PM"
        },
    ]

    const formattedDate = `${bookDate?.toDateString()} - GMT${bookDate?.toString().match(/GMT([+-]\d{4})/)?.[1] || ""}`;

    return (
        <div className="mb-[200px]">
            <h2 className="font-bold py-4 text-xl uppercase text-slate-500 tracking-wider">Select a Date and Time</h2>
            <div className="grid grid-cols-2 gap-4 lg:gap-0">
                <div className="sm:col-span-1 col-span-full">
                    <Calendar
                        mode="single"
                        selected={bookDate}
                        onSelect={setBookDate}
                        className="rounded-md border"
                    />
                </div>
                <div className="sm:col-span-1 col-span-full">
                    <div className="px-4">
                        {bookDate && <h2 className="pb-4 font-semibold text-center py-3 px-4 border border-blue-950">{formattedDate}</h2>}
                        <div className="py-3 grid grid-cols-2 gap-4">
                            {timeStamps.slice(0, 5).map((item, index) => {
                                return (
                                    <button key={index} className="bg-blue-950 text-white p-2 rounded-lg text-center text-sm">{item.time} {item.period}</button>
                                )
                            })}
                            <button className="bg-gray-200 text-blue-950 p-2 rounded-lg text-center text-sm truncate">More times</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    ) 
}
