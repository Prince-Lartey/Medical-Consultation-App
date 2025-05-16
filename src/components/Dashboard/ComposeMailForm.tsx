"use client"

import React, { useState } from 'react'
import TextInput from '../FormInputs/TextInput'
import { useForm } from 'react-hook-form'
import SubmitButton from '../FormInputs/SubmitButton'
import toast from 'react-hot-toast'
import { Button } from '../ui/button'
import Link from 'next/link'
import { FileIcon, Paperclip, X, XCircle } from 'lucide-react'
import { FaFilePdf, FaImage } from "react-icons/fa"
import dynamic from "next/dynamic";
import { sendEmail } from '../../../actions/mail'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import MultipleFileUpload, { File } from '../FormInputs/MultipleFileUpload'


const QuillEditor = dynamic(
    () => import("@/components/FormInputs/QuillEditor"),
    {
        ssr: false,
    }
);

export type MailProps = {
    to: string,
    subject: string,
    html: string,
    attachments: File[]
}

export default function ComposeMailForm() {
    const [isLoading, setIsLoading] = useState(false)

    const [content, setContent] = useState('');
    const [error, setError] = useState("")
    const [files, setFiles] = useState<File[]>([])

    const {register, reset, handleSubmit, formState: { errors }} = useForm<MailProps>()

    async function onSubmit(data: MailProps) {
        setIsLoading(true)
        console.log(data)

        if(!content || content === "<p><br></p>") {
            setError("Email body is required")
            setIsLoading(false)
            return
        }
        data.html = content
        data.attachments = files
        setError("")

        try {
            const res = await sendEmail(data)
            if(res.status === 200) {
                setIsLoading(false)
                toast.success("Email Sent Successfully")
                reset()
                setContent("")
                setFiles([])
            }
        } catch (error) {
            console.log(error)
            toast.error("Something went wrong")
        }
    }

    function handleImageRemove(fileIndex: any) {
        const updatedFiles = files.filter((file, index) => index !== fileIndex);
        setFiles(updatedFiles);
    }

    return (
        <div className="w-full max-w-xl shadow-sm rounded-md m-3 border border-gray-200 mx-auto">
            <div className="text-center border-b border-gray-200 py-4 dark:border-slate-600">
                <div className="flex justify-between items-center px-6">
                    <h1 className="scroll-m-20 text-2xl font-extrabold tracking-tight">New Message</h1>

                    <Button variant="outline">
                        <Link href="/dashboard/doctor/inbox" className="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">
                            <X className="w-4 h-4" />
                        </Link>
                    </Button>
                </div>
            </div>
            <form className="py-4 px-4 mx-auto " onSubmit={handleSubmit(onSubmit)}>
                <div className="grid grid-cols-2 gap-4">
                    <TextInput 
                        label="To"
                        register={register}
                        name="to"
                        errors={errors}
                        placeholder="Enter Receipient Mail"
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
                        error={error}
                    />
                </div>
                <div className="mt-4">
                    {
                        files && files.length > 0 && (
                            <div>
                                <h2 className="pb-2">Attachments</h2>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {
                                        files.map((file, index) => {
                                            const extension = file.title.split('.')[1]
                                            return (
                                                <div key={index} className="relative mb-6">
                                                    <button 
                                                        className="absolute -top-4 -right-2 bg-slate-100 rounded-full text-red-600"
                                                        onClick={() => handleImageRemove(index)}
                                                        type="button"
                                                    >
                                                        <XCircle className=""/>
                                                    </button>
                                                    <div className="py-3 rounded-md flex items-center px-6 bg-white dark:bg-slate-800 border border-slate-200 text-slate-800 dark:text-slate-200">
                                                        {extension === "pdf" ? <FaFilePdf className="w-8 h-8 mr-2 flex-shrink-0 text-red-500" /> : <FaImage className="w-8 h-8 mr-2 flex-shrink-0 text-gray-600" />}
                                                        
                                                        <div className="flex flex-col">
                                                            <span className="line-clamp-1 text-xs">{file.title}</span>
                                                            <span className="text-xs">{(file.size/1000).toFixed(2)} kb</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                        )
                    }
                </div>
                
                <div className="flex justify-between items-center mt-8 gap-4">
                    
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button variant="outline" className="flex">
                                <Paperclip className="w-4 h-4 mr-2" />
                                Add Attachments
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Upload Files</DialogTitle>
                            </DialogHeader>
                            <MultipleFileUpload
                                label="Add Attachments" 
                                files={files}
                                setFiles={setFiles}
                                endpoint="mailAttachments"
                            />
                        </DialogContent>
                    </Dialog>
                    
                    <SubmitButton title="Send Message" buttonType="submit" loadingTitle="Please wait..." isLoading={isLoading}/>
                </div>
            </form>
        </div>
    )
}
