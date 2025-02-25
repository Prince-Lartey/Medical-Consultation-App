import LoginForm from '@/components/Auth/LoginForm'
import React from 'react'

export default function page() {
    return (
        <div className="bg-gray-100 min-h-screen py-8 flex items-center justify-center">
            <div className="grid md:grid-cols-2 grid-cols-1 w-full bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700 max-w-5xl mx-auto overflow-hidden">
                <div className="hidden md:flex linear-bg"></div>
                <div className="">
                    <LoginForm />
                </div>
            </div>
        </div>
    )
}
