import PanelHeader from '@/components/Dashboard/Doctor/PanelHeader'
import React from 'react'
import NewButton from '@/components/Dashboard/Doctor/NewButton'
import { Activity, LayoutGrid } from 'lucide-react'
import { ScrollArea } from '@/components/ui/scroll-area'
import { getSymptoms } from '../../../../../actions/symptoms'
import { Symptom } from '@prisma/client'
import SymptomCard from '@/components/Dashboard/SymptomCard'

export default async function page() {
    const symptoms = (await getSymptoms()).data || []

    return (
        <div>
            <div className="grid grid-cols-12">
                <div className="col-span-4 py-3 border-r border-gray-100">
                    <div className="flex items-center justify-between">
                        <PanelHeader title="Symptoms" count={(symptoms.length).toString().padStart(2, "0")} icon={Activity} />
                        <div className="lg:hidden">
                            <NewButton title="New Symptom" href="/dashboard/symptoms/new" />
                        </div>
                    </div>
                    <div className="px-3">
                        <ScrollArea className="h-[32rem] w-full">
                            <div className="p-4">
                                {symptoms.map((symptom: Symptom) => (
                                    <SymptomCard key={symptom.title} symptom={symptom} />
                                ))}
                            </div>
                        </ScrollArea>
                    </div>
                </div>
                <div className="lg:col-span-8 col-span-full hidden lg:block">
                    <div className="py-2 px-4 border-b border-gray-200 flex items-center justify-end">
                        <div className="flex item-center gap-4">
                            <NewButton title="New Symptom" href="/dashboard/symptoms/new" />
                        </div>
                    </div>
                    <div className="flex h-1/2 items-center justify-center">
                        <div className="py-4 px-6 text-center border border-gray-100 shadow-md rounded-md flex flex-col items-center gap-1 text-sm">
                            <LayoutGrid />
                            <div className="py-3">
                                {" "}
                                <p>You have {(symptoms.length).toString().padStart(2, "0")} symptoms</p>
                            </div>
                            <NewButton title="New Symptom" href="/dashboard/symptoms/new" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}