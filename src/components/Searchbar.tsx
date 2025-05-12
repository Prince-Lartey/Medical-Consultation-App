"use client"

import { Search } from 'lucide-react'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function Searchbar() {
    const [query, setQuery] = useState("")
    const router = useRouter()

    function handleSearch(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        router.push(`/search?query=${query}`)
        setQuery("")
    }

    return (
        <form className="max-w-md mx-auto" onSubmit={handleSearch}>   
            <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
            <div className="relative">
                <input type="search" id="default-search" className="block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search Doctors, Specialties, Symptoms, Services" onChange={e => setQuery(e.target.value)} value={query} />
                <button type="submit" className="text-white absolute end-3 bottom-2 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-2 py-1 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    <Search className="w-4 h-4 text-white dark:text-white" />
                </button>
            </div>
        </form>
    )
}
