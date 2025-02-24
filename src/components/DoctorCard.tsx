import { Stethoscope } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function DoctorCard() {
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

    return (
        <div className="border border-slate-900 py-8 px-6 inline-flex flex-col bg-white">
            <Link href="#">
                <h2 className='uppercase font-bold text-2xl track-widest'>Vijal Patel, PAC</h2>
                <p className="py-3">3250 Lincoln Highway, Kendrall Park, NJ 08824</p>
                <div className="flex items-center gap-4 py-4">
                    <Image src="/doctor.jpg" width={512} height={512} alt="Doctor" className="w-24 h-24 rounded-full object-cover mr-2" />
                    <div className="flex flex-col gap-2">
                        <p className="flex items-center">
                            <Stethoscope className="w-4 h-4 mr-2 flex-shrink-0"/> 
                            <span>Family Medicine</span>
                        </p>
                        <p className="bg-green-400 py-3 px-6 uppercase">Available Today</p>
                    </div>
                </div>
            </Link>
            
            <div className="pt-6 border-t border-gray-400">
                <h3 className="flex gap-4 justify-between items-center">
                    <span className="text-gray-600">Tue, Mar 12</span> <span className="font-bold">GHS 1000</span>
                </h3>
                <div className="py-3 grid grid-cols-3 gap-4">
                    {timeStamps.slice(0, 5).map((item, index) => {
                        return (
                            <Link href="#" key={index} className="bg-blue-950 text-white py-2 px-4 rounded-lg">{item.time} {item.period}</Link>
                        )
                    })}
                    <Link href="#" className="bg-gray-200 text-blue-950 py-2 px-4 rounded-lg">More times</Link>
                </div>
            </div>
        </div>
    )
}
