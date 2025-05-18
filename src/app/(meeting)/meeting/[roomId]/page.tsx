import MeetingPage from '@/components/Hms/MeetingPage';
import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import React from 'react'

export default async function page({params} : {params: Promise<{ roomId: string }>;}) {
    const {roomId} = await params
    const session = await getServerSession(authOptions)
    if (!session) {
        redirect('/login')
    }

    return (
        <div>
            <MeetingPage roomId={roomId} session={session} />
        </div>
    )
}
