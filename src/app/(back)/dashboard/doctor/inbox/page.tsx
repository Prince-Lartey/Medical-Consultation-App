import React from 'react'
import NewButton from '@/components/Dashboard/Doctor/NewButton'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import NotAuthorized from '@/components/NotAuthorized'
import { getInboxMessage } from '../../../../../../actions/inbox'
import { Mail } from 'lucide-react'

export default async function page() {
    const session = await getServerSession(authOptions)
    const user = session?.user
    if (user?.role !== "DOCTOR") {
        return (
            <NotAuthorized />
        )
    }
    const messages = (await getInboxMessage()).data

    return (
        <div>
            <div className="col-span-8">
                <div className="py-2 px-4 border-b border-gray-200 flex items-center justify-end">
                    <div className="flex item-center gap-4">
                        <NewButton title="New Message" href="/dashboard/doctor/inbox/new" />
                    </div>
                </div>
                <div className="flex h-1/2 items-center justify-center">
                    <div className="py-4 px-6 text-center border border-gray-100 shadow-md rounded-md flex flex-col items-center gap-1 text-sm">
                        <Mail />
                        <div className="py-3">
                            {" "}
                            <p>You have {messages.length} messages.</p>
                        </div>
                        <NewButton title="New Message" href="/dashboard/doctor/inbox/new" />
                    </div>
                </div>
            </div>
        </div>
    )
}
