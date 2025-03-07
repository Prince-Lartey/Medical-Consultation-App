import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function page() {
    return (
        <div className="min-h-screen">
            <section className="py-16 px-4">
                <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2">
                    <div className="">
                        <h2 className="md:text-5xl text-2xl leading-10">Build a thriving <span className="text-blue-600 font-semibold">direct-pay</span> practice with PriMed</h2>
                        <p className="py-4">Welcome to PriMed, where connecting with patients is made easier than ever before. Our platform streamlines the process of managing appointments, providing care remotely, and keeping track of patient records. Join us in revolutionalizing the way you interact with your patients and providing top-notch healthcare services.</p>
                        <Link href="#">List your Practice</Link>
                    </div>
                    <Image src="/bg1.jpg" alt="" width={1000} height={667} className="w-full"/>
                </div>
            </section>
        </div>
    )
}
