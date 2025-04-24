import PanelHeader from '@/components/Dashboard/Doctor/PanelHeader'
import React from 'react'
import NewButton from '@/components/Dashboard/Doctor/NewButton'
import { LayoutGrid } from 'lucide-react'
import { getServices } from '../../../../../actions/services'
import { ScrollArea } from '@/components/ui/scroll-area'
import ServiceCard from '@/components/Dashboard/ServiceCard'
import { Service } from '@prisma/client'

export default async function page() {
    const services = (await getServices()).data || []

    return (
        <div>
            <div className="grid grid-cols-12">
                <div className="col-span-4 py-3 border-r border-gray-100">
                    <div className="flex items-center justify-between">
                        <PanelHeader title="Services" count={(services.length).toString().padStart(2, "0")} icon={LayoutGrid} />
                        <div className="lg:hidden">
                            <NewButton title="New Service" href="/dashboard/services/new" />
                        </div>
                    </div>
                    <div className="px-3">
                        <ScrollArea className="h-[32rem] w-full">
                            <div className="p-4">
                                {services.map((service: Service) => (
                                    <ServiceCard key={service.title} service={service} />
                                ))}
                            </div>
                        </ScrollArea>
                    </div>
                </div>
                <div className="lg:col-span-8 col-span-full hidden lg:block">
                    <div className="py-2 px-4 border-b border-gray-200 flex items-center justify-end">
                        <div className="flex item-center gap-4">
                            <NewButton title="New Service" href="/dashboard/services/new" />
                        </div>
                    </div>
                    <div className="flex h-1/2 items-center justify-center">
                        <div className="py-4 px-6 text-center border border-gray-100 shadow-md rounded-md flex flex-col items-center gap-1 text-sm">
                            <LayoutGrid />
                            <div className="py-3">
                                {" "}
                                <p>You have {(services.length).toString().padStart(2, "0")} services</p>
                                {/* <p>11 New Patients, 3 Follow Ups, 4 Annual Physicals</p> */}
                            </div>
                            <NewButton title="New Service" href="/dashboard/services/new" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}