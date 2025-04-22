import PanelHeader from '@/components/Dashboard/Doctor/PanelHeader'
import ListPanel from '@/components/Dashboard/Doctor/ListPanel'
import React from 'react'
import HomeDisplayCard from '@/components/Dashboard/Doctor/HomeDisplayCard'
import NewButton from '@/components/Dashboard/Doctor/NewButton'
import { LayoutGrid } from 'lucide-react'

export default function page() {
    return (
        <div>
            <div className="grid grid-cols-12">
                <div className="col-span-4 py-3 border-r border-gray-100">
                    <div className="flex items-center justify-between">
                        <PanelHeader title="Services" count={12} icon={LayoutGrid} />
                        <div className="lg:hidden">
                            <NewButton title="New Service" href="/dashboard/services/new" />
                        </div>
                    </div>
                    <div className="px-3">
                        <ListPanel />
                    </div>
                </div>
                <div className="lg:col-span-8 col-span-full hidden lg:block">
                    <div className="py-2 px-4 border-b border-gray-200 flex items-center justify-end">
                        <div className="flex item-center gap-4">
                            <NewButton title="New Service" href="/dashboard/services/new" />
                        </div>
                    </div>
                    <HomeDisplayCard />
                </div>
            </div>
        </div>
    )
}