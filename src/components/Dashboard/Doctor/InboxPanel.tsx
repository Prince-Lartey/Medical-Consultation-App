"use client"

import React from 'react'
import { ScrollArea } from "@/components/ui/scroll-area"
import Link from 'next/link'
import { Inbox } from '@prisma/client'
import { timeAgo } from '@/utils/timeAgo'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

export default function InboxPanel({ messages, role }: { messages: Inbox[], role: string}) {
    const pathname = usePathname()

    return (
        <ScrollArea className="h-[32rem] w-full">
            <div className="flex flex-col gap-2 p-4 pt-0">
                {messages.map((item) => (
                    <Link
                        href={role === "DOCTOR" ? `/dashboard/doctor/inbox/view/${item.id}` : `/dashboard/user/inbox/view/${item.id}`}
                        key={item.id}
                        className={cn("border mb-2 border-gray-300 shadow-sm text-xs py-3 px-2 inline-block w-full bg-white dark:text-slate-900 rounded-md", pathname === `/dashboard/${role === "DOCTOR" ? "doctor" : "user"}/inbox/view/${item.id}` && "border-gray-700 border-2 dark:border-blue-500 bg-gray-100")}
                    >
                        <div className="flex w-full flex-col gap-1">
                            <div className="flex items-center">
                                <div className="flex items-center gap-2">
                                    <div className="font-semibold">{item.senderName}</div>
                                </div>
                                <div className={cn("ml-auto text-xs",)}>
                                    {timeAgo(item.createdAt)}
                                </div>
                            </div>
                            <div className="text-xs font-medium">{item.subject}</div>
                        </div>
                    </Link>
                ))}
            </div>
        </ScrollArea>
    )
}
