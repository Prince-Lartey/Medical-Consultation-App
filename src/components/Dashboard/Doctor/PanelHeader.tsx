import { LucideIcon } from 'lucide-react'
import React from 'react'

export default function PanelHeader({title, count, icon}: {title: string, count: number, icon: LucideIcon}) {
    const Icon = icon

    return (
        <div className="py-2 px-6 border-b border-gray-200 flex items-center justify-between">
            <div className="flex items-center gap-1 text-sm">
                <Icon className="w-4 h-4 flex-shrink-0"/>
                <span>{title}</span>
                <span className="bg-white w-6 h-6 rounded-full flex items-center justify-center shadow-sm border text-xs dark:text-slate-900">{count}</span>
            </div>
        </div>
    )
}
