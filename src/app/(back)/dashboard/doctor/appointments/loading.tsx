'use client'

import React from 'react'

export default function Loading() {
    return (
        <div className="p-6 animate-pulse space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-4 border-b">
                <div>
                    <div className="h-6 dark:bg-gray-100 bg-gray-300 rounded w-40 mb-2" />
                    <div className="flex space-x-2 divide-x-2 divide-gray-300 text-sm">
                        <div className="h-4 dark:bg-gray-100 bg-gray-300 rounded w-16 mx-2" />
                        <div className="h-4 dark:bg-gray-100 bg-gray-300 rounded w-24 mx-2" />
                    </div>
                </div>
                <div>
                    <div className="h-5 dark:bg-gray-100 bg-gray-300 rounded w-32 mb-2" />
                    <div className="flex items-center space-x-2">
                        <div className="h-4 w-4 dark:bg-gray-100 bg-gray-300 rounded-full" />
                        <div className="h-4 dark:bg-gray-100 bg-gray-300 rounded w-20" />
                    </div>
                </div>
            </div>

            {/* Reason */}
            <div className="px-4 py-3 border-b flex space-x-4">
                <div className="h-4 dark:bg-gray-100 bg-gray-300 rounded w-20" />
                <div className="h-4 dark:bg-gray-100 bg-gray-300 rounded flex-1" />
            </div>

            {/* Date of Birth */}
            <div className="px-4 py-3 border-b flex space-x-4">
                <div className="h-4 dark:bg-gray-100 bg-gray-300 rounded w-28" />
                <div className="h-4 dark:bg-gray-100 bg-gray-300 rounded w-32" />
            </div>

            {/* Email */}
            <div className="px-4 py-3 border-b flex space-x-4">
                <div className="h-4 dark:bg-gray-100 bg-gray-300 rounded w-16" />
                <div className="h-4 dark:bg-gray-100 bg-gray-300 rounded w-48" />
            </div>

            {/* Location */}
            <div className="px-4 py-3 border-b flex space-x-4">
                <div className="h-4 dark:bg-gray-100 bg-gray-300 rounded w-20" />
                <div className="h-4 dark:bg-gray-100 bg-gray-300 rounded w-40" />
            </div>

            {/* Medical Documents */}
            <div className="px-4 py-3 border-b">
                <div className="h-4 dark:bg-gray-100 bg-gray-300 rounded w-40 mb-4" />
                <div className="grid grid-cols-4 gap-4">
                    {[...Array(4)].map((_, i) => (
                        <div key={i} className="h-10 dark:bg-gray-100 bg-gray-300 rounded" />
                    ))}
                </div>
            </div>

            {/* Appointment Status */}
            <div className="border-2 border-gray-300 shadow rounded-md p-4 my-4 mx-4">
                <div className="flex justify-between items-center mb-4">
                    <div className="h-6 dark:bg-gray-100 bg-gray-300 rounded w-40" />
                    <div className="h-6 dark:bg-gray-100 bg-gray-300 rounded w-24" />
                </div>
                <div className="h-10 dark:bg-gray-100 bg-gray-300 rounded w-full mb-4" />
                <div className="flex justify-between">
                    <div className="h-5 dark:bg-gray-100 bg-gray-300 rounded w-32" />
                    <div className="flex gap-4">
                        <div className="h-10 dark:bg-gray-100 bg-gray-300 rounded w-28" />
                        <div className="h-10 dark:bg-gray-100 bg-gray-300 rounded w-28" />
                    </div>
                </div>
            </div>
        </div>
    )
}
