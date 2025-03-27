import { UploadDropzone } from "@/utils/uploadthing"
import { PencilIcon } from "lucide-react"
import Image from "next/image"
import toast from "react-hot-toast"

export default function ImageInput ({
    label,
    imageUrl = "",
    setImageUrl,
    className = "col-span-full",
    endpoint = "",
} : {
    label: string,
    imageUrl: string,
    setImageUrl: any,
    className?: string,
    endpoint: any
}) {
    return (
        <div className={className}>
            <div className="flex justify-between items-center mb-4">
                <label htmlFor="course-image" className="block text-sm font-medium leading-6 text-gray-900 dark:text-slate-50 mb-2">{label}</label>
                {
                    imageUrl && (
                        <button 
                            className="flex space-x-2 bg-slate-900 rounded-md shadow text-slate-50 py-2 px-2"
                            type="button"
                            onClick={() => setImageUrl("")}
                        >
                            <PencilIcon className="h-5 w-5"/>
                            <span>Change Image</span>
                        </button>
                    )
                }
            </div>
            {
                imageUrl ? (
                    <Image 
                        src={imageUrl} 
                        alt="Item image"
                        width={1000}
                        height={667}
                        className="w-full h-64 object-contain"
                    />
                ) : (
                    <UploadDropzone 
                        endpoint={`${endpoint}` as any}
                        onClientUploadComplete={(res: any) => {
                            setImageUrl(res[0].url);

                            toast.success("Image upload complete")
                            console.log("Files: ", res);

                        }}
                        onUploadError={(error: any) => {
                            toast.error("Image upload failed, Try again")
                            console.error(`Error: ${error.message}`, error);
                        }}
                    />
                )
            }
        </div>
    )
}