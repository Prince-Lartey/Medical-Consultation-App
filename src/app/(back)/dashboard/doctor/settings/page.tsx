import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import AvailabilitySettings from '@/components/Dashboard/Doctor/AvailabilitySettings'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { getDoctorProfileById } from '../../../../../../actions/onboarding'
import DoctorServiceSettings from '@/components/Dashboard/Doctor/DoctorServiceSettings'

export default async function page() {
    const session = await getServerSession(authOptions)
    const user = session?.user
    const profile = await getDoctorProfileById(user?.id)
    return (
        <div className="mx-auto w-full px-6 py-4">
            <h2 className="pb-4 scroll-m-20 text-3xl font-extrabold tracking-tight lg:text-4xl">Settings</h2>
            <Tabs defaultValue="availability" className="w-[1000px]">
                <TabsList>
                    <TabsTrigger value="availability">Availability Settings</TabsTrigger>
                    <TabsTrigger value="account">Service Settings</TabsTrigger>
                </TabsList>
                <TabsContent value="availability">
                    <AvailabilitySettings profile={profile?.data}/>
                </TabsContent>
                <TabsContent value="account">
                    <DoctorServiceSettings />
                </TabsContent>
            </Tabs>
        </div>
    )
}
