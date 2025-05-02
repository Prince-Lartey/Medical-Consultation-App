"use client"

import { Plus } from 'lucide-react'
import React from 'react'
import { Button } from './ui/button'
import { DoctorDetail } from '../../types/types'
import getFormattedDate from '@/utils/getFormattedDate'

export default function FixedBookButton({doctor}: {doctor: DoctorDetail}) {
    const formattedDate = getFormattedDate()
    return (
        <div className="fixed bottom-0 w-full shadow-2xl py-8 px-6 z-50 bg-white dark:bg-slate-700">
            <div className="max-w-4xl mx-auto flex justify-between">
                <div className="w-full">
                    <p className="text-xl font-bold">GHS {doctor.doctorProfile?.hourlyWage}</p>
                    <p className="font-semibold text-sm">{formattedDate}</p>
                </div>
                <Button
                    variant="outline"
                    className="inline-flex items-center justify-center px-4 py-4 text-sm font-semibold uppercase tracking-widest leading-5 text-white transition-all duration-200 bg-blue-600 border border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600 hover:bg-blue-500 hover:text-slate-50 hover:border-blue-950"
                >
                    <Plus className="w-5 h-5 mr-1" />
                    Book
                </Button>   
            </div>
            
        </div>
    )
}