import React from 'react'

export default function Loading() {
    return (
        <div className="p-4">
            <div className="border-b pb-3 mb-3">
                <div className="h-6 w-48 bg-gray-200 rounded animate-pulse" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[...Array(4)].map((_, i) => (
                <div key={i} className="border border-gray-300 shadow-sm text-xs py-3 px-2 w-full bg-white dark:bg-slate-950 rounded-md animate-pulse space-y-3">
                    <div className="flex justify-between items-center pb-2">
                        <div className="h-4 w-32 bg-gray-200 rounded" />
                        <div className="h-4 w-20 bg-gray-200 rounded" />
                    </div>
                    <div className="flex items-center gap-4 border-b pb-2">
                        <div className="h-4 w-28 bg-gray-200 rounded" />
                        <div className="h-4 w-16 bg-gray-200 rounded" />
                    </div>
                    <div className="h-4 w-24 bg-gray-200 rounded pt-2" />
                </div>
                ))}
            </div>
        </div>
    )
}
