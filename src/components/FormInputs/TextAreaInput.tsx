import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils";

type TextAreaInputProps = {
    label: string;
    register: any;
    name: string;
    errors: any;
    placeholder?: string
    className?: string
}

export default function TextAreaInput({ label, register, name, errors, placeholder, className="col-span-full" }: TextAreaInputProps) {
    return (
        <div className={cn("grid gap-2", className)}>
            <Label htmlFor={`${name}`}>{label}</Label>
            <Textarea 
                {...register(`${name}`, {required: true})}
                id={`${name}`}
                name={`${name}`}
                placeholder={placeholder ? placeholder : `Enter your ${label}`}
            />
            {errors[`${name}`] && <span className="text-red-500 text-sm">{label} is required</span>}
        </div>
    )
}
