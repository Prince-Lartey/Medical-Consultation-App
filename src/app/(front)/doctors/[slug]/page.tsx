import Image from 'next/image'
import React from 'react'

export default function page() {
    return (
        <div className="bg-slate-50 py-24 min-h-screen">
            <div className="max-w-4xl border border-gray-200 mx-auto bg-white shadow-md rounded-md">
                <div className="py-6 px-8">
                    <div className="flex items-center justify-between">
                        <div className="">
                            <div className="flex flex-col">
                                <h2 className='uppercase font-bold text-2xl track-widest'>Vijal Patel, PAC</h2>
                                <p className="text-gray-500 text-xs uppercase">Adult Health</p>
                            </div>
                            <div className="py-3">
                                <p>In-Person Doctor Visit</p>
                                <p>3250 Lincoln Highway, Kendall Park, NJ 08824</p>
                            </div>
                        </div>
                        <Image src="/doctor.jpg" width={512} height={512} alt="Doctor" className="w-36 h-36 rounded-md object-cover mr-2" />
                    </div>
                </div>
            </div>
        </div>
    )
}
