import React from 'react'
import { ScrollArea } from "@/components/ui/scroll-area"
import Link from 'next/link'
import { Briefcase, Dot } from 'lucide-react'

const tags = Array.from({ length: 50 }, (_, i) => ({
    id: i + 1,
    name: `name-${i + 1}`,
}))

export default function ListPanel() {
    return (
        <ScrollArea className="h-[32rem] w-full">
            <div className="p-4">
                {tags.map((tag, i) => (
                    <Link key={i}  href="/dashboard/doctor/appointments/view/1" className="border mb-2 border-gray-100 shadow-sm text-xs py-3 px-2 inline-block w-full bg-white dark:text-slate-900 rounded-md">
                        <div className="flex justify-between items-center">
                            <h2>Prince Lartey</h2>
                            <span>4:00pm</span>
                        </div>
                        <div className="flex items-center gap-4 pb-2">
                            <div className="flex items-center">
                                <Dot />
                                <span>Follow Up</span>
                            </div>
                            <div className="flex items-center">
                                <Briefcase className="w-4 h-4 mr-2"/>
                                <span>Exam</span>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </ScrollArea>
    )
}
