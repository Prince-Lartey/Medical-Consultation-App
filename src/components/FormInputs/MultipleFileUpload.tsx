import { UploadDropzone } from "@/utils/uploadthing"
import { FileIcon, PencilIcon, XCircle } from "lucide-react"
import toast from "react-hot-toast"
import { FaFilePdf, FaImage } from "react-icons/fa"

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
                {
                    files && files.length > 0 && (
                        <button 
                            className="flex space-x-2 bg-slate-900 rounded-md shadow text-slate-50 py-2 px-2"
                            type="button"
                            onClick={() => setFiles([])}
                        >
                            <PencilIcon className="h-5 w-5"/>
                            <span>Change Files</span>
                        </button>
                    )
                }
            </div>
            {
                files && files.length > 0 ? (
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
                                            {extension === "pdf" ? <FaFilePdf className="w-8 h-8 mr-2 flex-shrink-0 text-red-500" /> : <FaImage className="w-8 h-8 mr-2 flex-shrink-0 text-gray-600" />}                                            <div className="flex flex-col">
                                                <span className="line-clamp-1 text-xs">{file.title}</span>
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