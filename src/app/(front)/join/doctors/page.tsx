import CustomButton from '@/components/CustomButton'
import { CheckCheck, CheckIcon } from 'lucide-react'
import Image from 'next/image'
import React from 'react'


export default function page() {
    const features = [
        "PriMed brings patients to you",
        "Seamless e-prescribing experience",
        "Integrated clinical note-taking"
    ]

    const steps = [
        "List your Practice",
        "Create competitive offerings",
        "Start seeing patients"
    ]

    const cards = [
        {
            title: "Begin Your Journey",
            description: "Start a new application to join our network of healthcare providers.",
            link: "/",
            linkTitle: "Start a New Application"
        },
        {
            title: "Resume Application",
            description: "Pick up from where you left off and complete your onboarding process.",
            link: "/",
            linkTitle: "Continue your Application"
        },
        {
            title: "Schedule a Call",
            description: "Arrange a time for a call to finalize your application.",
            link: "/",
            linkTitle: "Schedule a Call"
        },
        {
            title: "Track your Progress",
            description: "Monitor the status of your application and approvals in real-time.",
            link: "/",
            linkTitle: "Check Status"
        }
    ]

    return (
        <div className="min-h-screen">
            <section className="py-16 px-4">
                <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="">
                        <h2 className="sm:text-[3rem] text-[1.5rem] leading-[3.5rem]">Build a thriving{" "} <span className="text-blue-600 font-semibold">direct-pay</span>{" "} practice with PriMed</h2>
                        <p className="py-4">Welcome to PriMed, where connecting with patients is made easier than ever before. Our platform streamlines the process of managing appointments, providing care remotely, and keeping track of patient records. Join us in revolutionalizing the way you interact with your patients and providing top-notch healthcare services.</p>
                        <CustomButton title="List your Service" href="#" className="bg-blue-950" />
                        <div className="py-6">
                            {
                                features.map((feature, index) => {
                                    return (
                                        <p key={index} className="flex items-center py-2">
                                            <CheckIcon className="h-4 w-4 text-blue-500 flex-shrink-0 mr-2" />
                                            {feature}
                                        </p>
                                    )
                                })
                            }
                        </div>
                    </div>
                    <Image src="/bg1.jpg" alt="" width={1000} height={667} className="w-full"/>
                </div>
            </section>

            <section className="py-16 px-4">
                <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
                    <Image src="/bg1.jpg" alt="" width={1000} height={667} className="w-full hidden sm:block"/>
                    <div className="">
                        <h2 className="sm:text-4xl text-2xl">Join PriMed to increase your{" "} <span className="text-blue-600 font-semibold">revenue</span>{" "} today.</h2>
                        <div className="py-6">
                            {
                                steps.map((step, index) => {
                                    return (
                                        <p key={index} className="flex items-center py-2">
                                            <CheckCheck className="h-4 w-4 text-blue-500 flex-shrink-0 mr-2" />
                                            {step}
                                        </p>
                                    )
                                })
                            }
                        </div>
                        <div className='grid grid-cols-2 gap-4'>
                            {
                                cards.map((card, index) => {
                                    return (
                                        <div key={index} className='bg-blue-950 p-4 rounded-lg shadow-2xl'>
                                            <h3 className='text-white text-2xl font-semibold'>{card.title}</h3>
                                            <p className='text-white py-2 text-xs'>{card.description}</p>
                                            <CustomButton title={card.linkTitle} href={card.link} className='text-white bg-blue-600 hover:bg-blue-800' />
                                        </div>
                                    )
                                })
                            }
                        </div>
                        
                        
                    </div>
                </div>
            </section>
        </div>
    )
}
