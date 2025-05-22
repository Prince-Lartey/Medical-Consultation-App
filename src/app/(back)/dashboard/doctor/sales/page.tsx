import Sales from '@/components/Dashboard/Doctor/Sales'
import React from 'react'

export default function page() {
    const doctorSales = {}
    return (
        <div>
            <Sales data={doctorSales} title="Doctor Sales" />
        </div>
    )
}
