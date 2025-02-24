"use client"

import React, { useState } from 'react'

export default function DoctorDetails() {
    const [isActive, setIsActive] = useState("availability")

    return (
        <div>
            <div className="flex items-center justify-between">
                <button onClick={() =>setIsActive("details")} className={isActive==="details" ? "py-4 px-8 bg-blue-950 text-white w-full uppercase tracking-widest" : "py-4 px-8 bg-gray-100 text-blue-950 w-full uppercase tracking-widest"}>Service Details</button>
                <button onClick={() =>setIsActive("availability")} className={isActive==="availability" ? "py-4 px-8 bg-blue-950 text-white w-full uppercase tracking-widest" : "py-4 px-8 bg-gray-100 text-blue-950 w-full uppercase tracking-widest"}>Availability</button>
            </div>
            <div className='py-8 px-6'>
                {isActive==="availability" ? (
                    <div>
                        Availability Components
                    </div>
                ) : (
                    <div>
                        Service Details Components
                    </div>
                )}
            </div>
        </div>
    )
}
