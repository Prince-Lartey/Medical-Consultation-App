// import MegaMenu from '@/components/Frontend/MegaMenu'
import Footer from '@/components/Frontend/Footer'
import Navbar from '@/components/Frontend/Navbar'
import React, { ReactNode } from 'react'

export default function Layout({ children }: { children: ReactNode }) {
    return (
        <div className="">
            <Navbar />
            {/* <div className="mx-auto py-4 fixed top-20 w-full flex justify-center items-center bg-gray-200 z-50">
                <MegaMenu />
            </div> */}
            <div className="mt-[80px]">
                {children}
            </div>
            <Footer />
        </div>
    )
}
