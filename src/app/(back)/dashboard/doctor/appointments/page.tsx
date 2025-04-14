import PanelHeader from '@/components/Dashboard/Doctor/PanelHeader'
import ListPanel from '@/components/Dashboard/Doctor/ListPanel'
import React from 'react'

export default function page() {
    return (
        <div>
            <PanelHeader />
            <div className="grid grid-cols-12">
                <div className="col-span-4 px-3 py-3">
                    <ListPanel />
                </div>
                <div className="col-span-8">

                </div>
                
            </div>
        </div>
    )
}
