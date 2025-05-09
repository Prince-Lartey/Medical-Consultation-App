import React from 'react'

export default function NotAuthorized() {
    return (
        <main className="grid min-h-screen place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
            <div className="text-center">
                <p className="text-xl font-semibold text-indigo-600">403</p>
                <h1 className="mt-3 text-2xl font-semibold tracking-tight text-balance text-gray-900 sm:text-5xl">Forbidden</h1>
                <p className="mt-4 text-sm font-medium text-pretty text-gray-500 sm:text-xl/8">Oops! You do not have permission to access this page.</p>
            </div>
        </main>
    )
}
