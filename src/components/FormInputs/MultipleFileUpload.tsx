import { UploadDropzone } from "@/utils/uploadthing"
import { FileIcon, XCircle } from "lucide-react"
import toast from "react-hot-toast"

type MultipleImageInputProps = {
    label: string,
    files: File[],
    setFiles: any,
    className?: string,
    endpoint?: any
}

export type File = {
    title: string;
    size: number;
    url: string;
}

export default function MultipleFileUpload ({
    label,
    files,
    setFiles,
    className = "col-span-full",
    endpoint = ""
} : MultipleImageInputProps) {

    function handleImageRemove(fileIndex: any) {
        const updatedFiles = files.filter((file, index) => index !== fileIndex);
        setFiles(updatedFiles);
    }

    return (
        <div className={className}>
            <div className="flex justify-between items-center mb-4">
                <label htmlFor="course-image" className="block text-sm font-medium leading-6 text-gray-900 dark:text-slate-50">{label}</label>
            </div>
            {
                files.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {
                            files.map((file, index) => {
                                return (
                                    <div key={index} className="relative mb-6">
                                        <button 
                                            className="absolute -top-4 -right-2 bg-slate-100 rounded-full text-slate-900"
                                            onClick={() => handleImageRemove(index)}
                                        >
                                            <XCircle className=""/>
                                        </button>
                                        <div className="py-3 rounded-md flex items-center px-6 bg-white dark:bg-slate-800 border border-slate-200 text-slate-800 dark:text-slate-200">
                                            <FileIcon className="w-8 h-8 mr-2 flex-shrink-0" />
                                            <div className="flex flex-col">
                                                <span className="line-clamp-1">{file.title}</span>
                                                <span className="text-xs">{(file.size/1000).toFixed(2)} kb</span>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                ) : (
                    <UploadDropzone 
                        endpoint={endpoint}
                        onClientUploadComplete={(res) => {
                            console.log(res)
                            const urls = res.map((item) => {
                                return {
                                    url: item.url,
                                    title: item.name,
                                    size: item.size
                                }
                            });
                            setFiles(urls);
                            console.log(urls);
                            console.log("Upload Completed")
                        }}
                        onUploadError={(error) => {
                            toast.error("File upload failed, Try again")
                            console.error(`Error: ${error.message}`, error);
                        }}
                    />
                )
            }
        </div>
    )
}