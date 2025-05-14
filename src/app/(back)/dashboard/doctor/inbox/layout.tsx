import PanelHeader from '@/components/Dashboard/Doctor/PanelHeader'
import React from 'react'
import { Mail } from 'lucide-react'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import NotAuthorized from '@/components/NotAuthorized'
import { getInboxMessage } from '../../../../../../actions/inbox'
import InboxPanel from '@/components/Dashboard/Doctor/InboxPanel'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default async function layout({children}: {children: React.ReactNode}) {
    const session = await getServerSession(authOptions)
    const user = session?.user
    if (user?.role !== "DOCTOR") {
        return (
            <NotAuthorized />
        )
    }
    const messages = (await getInboxMessage()).data

    return (
        <div className="grid grid-cols-12">
            <div className="col-span-4 py-3 border-r border-gray-100">
                <PanelHeader title="Inbox Messages" count={messages.length} icon={Mail} />
                <div className="p-3">
                    <Tabs defaultValue="received" className="">
                        <TabsList>
                            <TabsTrigger value="received">Received</TabsTrigger>
                            <TabsTrigger value="sent">Sent</TabsTrigger>
                        </TabsList>
                        <TabsContent value="received">
                            <InboxPanel messages={messages} role={user?.role}/>
                        </TabsContent>
                        <TabsContent value="sent">
                            <InboxPanel messages={messages} role={user?.role}/>
                        </TabsContent>
                    </Tabs>
                </div>
            </div>
            <div className="col-span-8">{children}</div>
        </div>
    )
}
