import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function page() {
    return (
        <div className="mx-auto w-full px-6 py-4">
            <h2 className="pb-4 scroll-m-20 text-3xl font-extrabold tracking-tight lg:text-4xl">Settings</h2>
            <Tabs defaultValue="availability" className="w-[800px]">
                <TabsList>
                    <TabsTrigger value="availability">Availability</TabsTrigger>
                    <TabsTrigger value="account">Account Settings</TabsTrigger>
                </TabsList>
                <TabsContent value="availability">Please Add your Availability for the Whole Week.</TabsContent>
                <TabsContent value="account">Change your password here.</TabsContent>
            </Tabs>
        </div>
    )
}
