import { Loader } from 'lucide-react';
import React from 'react'

type SubmitButtonProps ={
    title: string;
    buttonType?: "button" | "submit" | "reset" | undefined;
    isLoading: boolean;
    loadingTitle: string;
}

export default function SubmitButton({ title, buttonType="submit", isLoading=false, loadingTitle }: SubmitButtonProps) {
    return (
        <div>
            {isLoading ? (
                <button
                    type={buttonType}
                    disabled
                    className="flex w-full justify-center rounded-md bg-indigo-400 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 items-center "
                >
                    <Loader className="w-4 h-4 mr-2 flex-shrink-0 animate-spin"/> {loadingTitle}
                </button>
            ): (
                <button
                    type={buttonType}
                    className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                    {title}
                </button>
            )}
        </div>
    )
}
