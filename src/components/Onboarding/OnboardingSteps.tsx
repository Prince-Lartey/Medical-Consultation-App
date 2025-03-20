import Link from 'next/link'
import React from 'react'

export default function OnboardingSteps() {
    return (
        <div className="grid grid-cols-12 mx-auto rounded-sm shadow-inner overflow-hidden border border-slate-200 min-h-screen bg-gray-100">
            <div className='col-span-full sm:col-span-2 divide-y-2 divide-gray-200'>
                <Link href="#" className="block py-3 px-4 bg-cyan-900 text-gray-100 shadow-inner">1</Link>
                <div className="py-3 px-4 bg-gray-400 text-gray-800 shadow-inner">1</div>
                <div className="py-3 px-4 bg-gray-400 text-gray-800 shadow-inner">1</div>
                <div className="py-3 px-4 bg-gray-400 text-gray-800 shadow-inner">1</div>
                <div className="py-3 px-4 bg-gray-400 text-gray-800 shadow-inner">1</div>
                <div className="py-3 px-4 bg-gray-400 text-gray-800 shadow-inner">1</div>
            </div>
            <div className='col-span-full sm:col-span-10 bg-gray-100 p-4'>
                <div>2</div>
                <div>2</div>
                <div>2</div>
                <div>2</div>
                <div>2</div>
            </div>
        </div>
    )
}
