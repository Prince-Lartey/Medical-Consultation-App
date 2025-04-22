import PanelHeader from '@/components/Dashboard/Doctor/PanelHeader'
import ListPanel from '@/components/Dashboard/Doctor/ListPanel'
import React from 'react'
import HomeDisplayCard from '@/components/Dashboard/Doctor/HomeDisplayCard'
import NewButton from '@/components/Dashboard/Doctor/NewButton'
import { Calendar } from 'lucide-react'

export default function page() {
    return (
        <div>
            
            <div className="grid grid-cols-12">
                <div className="col-span-4 py-3 border-r border-gray-100">
                    <PanelHeader title="Appointments" count="11" icon={Calendar} />
                    <div className="px-3">
                        <ListPanel />
                    </div>
                </div>
                <div className="col-span-8">
                    <div className="py-2 px-4 border-b border-gray-200 flex items-center justify-end">
                        <div className="flex item-center gap-4">
                            <NewButton title="New Appointment" href="#" />
                        </div>
                    </div>
                    <HomeDisplayCard />
                </div>
            </div>
        </div>
    )
}
