"use client"

import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Monday from './AvailabilityDays/Monday'
import { DoctorProfile } from '@prisma/client'
import Tuesday from './AvailabilityDays/Tuesday'
import Wednesday from './AvailabilityDays/Wednesday'
import Thursday from './AvailabilityDays/Thursday'
import Friday from './AvailabilityDays/Friday'
import Saturday from './AvailabilityDays/Saturday'
import Sunday from './AvailabilityDays/Sunday'

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
                <TabsList className='my-3'>
                    <TabsTrigger value="monday">Monday</TabsTrigger>
                    <TabsTrigger value="tuesday">Tuesday</TabsTrigger>
                    <TabsTrigger value="wednesday">Wednesday</TabsTrigger>
                    <TabsTrigger value="thursday">Thursday</TabsTrigger>
                    <TabsTrigger value="friday">Friday</TabsTrigger>
                    <TabsTrigger value="saturday">Saturday</TabsTrigger>
                    <TabsTrigger value="sunday">Sunday</TabsTrigger>
                </TabsList>
                <TabsContent value="monday">
                    <Monday profile={profile} day="monday"/>
                </TabsContent>
                <TabsContent value="tuesday">
                    <Tuesday profile={profile} day="tuesday"/>
                </TabsContent>
                <TabsContent value="wednesday">
                    <Wednesday profile={profile} day="wednesday"/>
                </TabsContent>
                <TabsContent value="thursday">
                    <Thursday profile={profile} day="thursday"/>
                </TabsContent>
                <TabsContent value="friday">
                    <Friday profile={profile} day="friday"/>
                </TabsContent>
                <TabsContent value="saturday">
                    <Saturday profile={profile} day="saturday"/>
                </TabsContent>
                <TabsContent value="sunday">
                    <Sunday profile={profile} day="sunday"/>
                </TabsContent>                
            </Tabs>
        </div>
    )
}
