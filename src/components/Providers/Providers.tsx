"use client"

import { SessionProvider } from 'next-auth/react'
import React from 'react'
import {Toaster} from "react-hot-toast"

export default function Providers({children}: {children: React.ReactNode}) {
    return (
        <SessionProvider>
            <Toaster position="top-center" reverseOrder={false} />
            {children}
        </SessionProvider>
    )
}
