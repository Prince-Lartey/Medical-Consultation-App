"use client"

import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Monday from './AvailabilityDays/Monday'
import { DoctorProfile } from '@prisma/client'
import Tuesday from './AvailabilityDays/Tuesday'
import Wednesday from './AvailabilityDays/Wednesday'

export default function AvailabilitySettings({profile}: {profile: DoctorProfile | undefined | null}) {
    // const tabs = [
    //     {
    //         title: "Monday",
    //         active: true,
    //         component: <>This is <span className="font-medium text-gray-800 dark:text-white">Profile tab&apos;s associated content</span>.
    //         Clicking another tab will toggle the visibility of this one for the next. The tab JavaScript swaps classes to
    //         control the content visibility and styling.</>
    //     },
    //     {
    //         title: "Tuesday",
    //         component: <>This is <span className="font-medium text-gray-800 dark:text-white">Profile tab&apos;s associated content</span>.
    //         Clicking another tab will toggle the visibility of this one for the next. The tab JavaScript swaps classes to
    //         control the content visibility and styling.</>
    //     },
    //     {
    //         title: "Wednesday",
    //         component: <>This is <span className="font-medium text-gray-800 dark:text-white">Profile tab&apos;s associated content</span>.
    //         Clicking another tab will toggle the visibility of this one for the next. The tab JavaScript swaps classes to
    //         control the content visibility and styling.</>
    //     },
    //     {
    //         title: "Thursday",
    //         component: <>This is <span className="font-medium text-gray-800 dark:text-white">Profile tab&apos;s associated content</span>.
    //         Clicking another tab will toggle the visibility of this one for the next. The tab JavaScript swaps classes to
    //         control the content visibility and styling.</>
    //     },
    //     {
    //         title: "Friday",
    //         component: <>This is <span className="font-medium text-gray-800 dark:text-white">Profile tab&apos;s associated content</span>.
    //         Clicking another tab will toggle the visibility of this one for the next. The tab JavaScript swaps classes to
    //         control the content visibility and styling.</>
    //     },
    //     {
    //         title: "Saturday",
    //         component: <>This is <span className="font-medium text-gray-800 dark:text-white">Profile tab&apos;s associated content</span>.
    //         Clicking another tab will toggle the visibility of this one for the next. The tab JavaScript swaps classes to
    //         control the content visibility and styling.</>
    //     },
    //     {
    //         title: "Sunday",
    //         component: <>This is <span className="font-medium text-gray-800 dark:text-white">Profile tab&apos;s associated content</span>.
    //         Clicking another tab will toggle the visibility of this one for the next. The tab JavaScript swaps classes to
    //         control the content visibility and styling.</>
    //     },
    // ]

    return (
        <div className="">
            <p className="py-5 text-sm uppercase font-semibold">Please add your availability for the whole week.</p>
            <Tabs defaultValue="monday" >
                <TabsList>
                    <TabsTrigger value="monday">Monday</TabsTrigger>
                    <TabsTrigger value="tuesday">Tuesday</TabsTrigger>
                    <TabsTrigger value="wednesday">Wednesday</TabsTrigger>
                    <TabsTrigger value="thursday">Thursday</TabsTrigger>
                    <TabsTrigger value="friday">Friday</TabsTrigger>
                    <TabsTrigger value="saturday">Saturday</TabsTrigger>
                    <TabsTrigger value="sunday">Sunday</TabsTrigger>
                </TabsList>
                <TabsContent value="monday">
                    <Monday profile={profile}/>
                </TabsContent>
                <TabsContent value="tuesday">
                    <Tuesday profile={profile}/>
                </TabsContent>
                <TabsContent value="wednesday">
                    <Wednesday profile={profile}/>
                </TabsContent>
                <TabsContent value="thursday">
                    This is <span className="font-medium text-gray-800 dark:text-white">Profile tab&apos;s associated content</span>.
                    Clicking another tab will toggle the visibility of this one for the next. The tab JavaScript swaps classes to
                    control the content visibility and styling.
                </TabsContent>
                <TabsContent value="friday">
                    This is <span className="font-medium text-gray-800 dark:text-white">Profile tab&apos;s associated content</span>.
                    Clicking another tab will toggle the visibility of this one for the next. The tab JavaScript swaps classes to
                    control the content visibility and styling.
                </TabsContent>
                <TabsContent value="saturday">
                    This is <span className="font-medium text-gray-800 dark:text-white">Profile tab&apos;s associated content</span>.
                    Clicking another tab will toggle the visibility of this one for the next. The tab JavaScript swaps classes to
                    control the content visibility and styling.
                </TabsContent>
                <TabsContent value="sunday">
                    This is <span className="font-medium text-gray-800 dark:text-white">Profile tab&apos;s associated content</span>.
                    Clicking another tab will toggle the visibility of this one for the next. The tab JavaScript swaps classes to
                    control the content visibility and styling.
                </TabsContent>                
            </Tabs>
        </div>
    )
}
