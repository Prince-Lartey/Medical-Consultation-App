"use client"

import React, { useState } from 'react'
import TextInput from '../FormInputs/TextInput'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import SubmitButton from '../FormInputs/SubmitButton'
import toast from 'react-hot-toast'
import { Button } from '../ui/button'
import Link from 'next/link'
import { X } from 'lucide-react'
import FormSelectInput from '../FormInputs/FormSelectInput'
import { Options } from "react-tailwindcss-select/dist/components/type";
import { InboxProps } from '../../../types/types'
import dynamic from "next/dynamic";
import { Session } from 'next-auth'
import { createInboxMessage } from '../../../actions/inbox'

const QuillEditor = dynamic(
    () => import("@/components/FormInputs/QuillEditor"),
    {
        ssr: false,
    }
);

export type ServiceProps = {
    title: string,
    imageUrl: string,
    slug: string,
}

export default function InboxForm({title, users, session}: {title: string, users: Options, session: Session | null}) {
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()

    const [selectedUser, setSelectedUser] =useState<any>(null);
    const [content, setContent] = useState('');

    const {register, reset, handleSubmit, formState: { errors }} = useForm<InboxProps>()

    async function onSubmit(data: InboxProps) {
        setIsLoading(true)
        data.receiverId = selectedUser.value
        data.senderId = session?.user?.id ?? ""
        data.senderEmail = session?.user?.email ?? ""
        data.senderName = session?.user?.name ?? ""
        data.body = content
        console.log(data)

        try {
            const res = await createInboxMessage(data)
            if (res.status === 201){
                reset()
                toast.success("Message sent successfully!")
                setIsLoading(false)
                router.push(`/dashboard/${session?.user.role === "DOCTOR" ? "doctor" : "user"}/inbox`)
            }
        } catch (error) {
            setIsLoading(false)
            console.log(error)
        }

    }

    return (
        <div className="w-full max-w-xl shadow-sm rounded-md m-3 border border-gray-200 mx-auto">
            <div className="text-center border-b border-gray-200 py-4 dark:border-slate-600">
                <div className="flex justify-between items-center px-6">
                    <h1 className="scroll-m-20 text-2xl font-extrabold tracking-tight">{title}</h1>

                    <Button variant="outline">
                        <Link href="/dashboard/doctor/inbox" className="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">
                            <X className="w-4 h-4" />
                        </Link>
                    </Button>
                </div>
            </div>
            <form className="py-4 px-4 mx-auto " onSubmit={handleSubmit(onSubmit)}>
                <div className="grid grid-cols-2 gap-4">
                    <FormSelectInput
                        label="Recipient"
                        options={users}
                        option={selectedUser}
                        setOption={setSelectedUser}
                    />
                    <TextInput 
                        label="Message Subject"
                        register={register}
                        name="subject"
                        errors={errors}
                        placeholder="Enter Subject"
                    />
                    <QuillEditor
                        label="Write the Content of your Message"
                        value={content}
                        onChange={setContent}
                    />
                </div>
                
                <div className="flex justify-between items-center mt-8">
                    <Button variant="outline">
                        <Link href="/dashboard/doctor/inbox" className="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">
                            Cancel
                        </Link>
                    </Button>

                    <SubmitButton title="Send Message" buttonType="submit" loadingTitle="Please wait..." isLoading={isLoading}/>
                </div>
            </form>
        </div>
    )
}
