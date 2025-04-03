import { Label } from "../ui/label";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

type SelectInputProps = {
    label: string;
    optionTitle: string;
    className?: string;
    options: SelectOptions[];
    selectedOptions: any;
    setSelectedOptions: any;
}

export type SelectOptions = {
    label: string;
    value: string;
}

export default function ShadSelectInput({
    label,
    optionTitle,
    className = "sm:col-span-2",
    options = [],
    selectedOptions,
    setSelectedOptions
}: SelectInputProps) {
    return (
        <div className={`grid grid-2 ${className}`}>
            <Label htmlFor="select" className="text-sm font-medium text-gray-700">
                {label}
            </Label>
            <Select
                onValueChange={(value) => setSelectedOptions(value)}
                defaultValue={selectedOptions}
            >
                <SelectTrigger className="w-full">
                    <SelectValue placeholder={optionTitle} />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectLabel>{optionTitle}</SelectLabel>
                        {options.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                                {option.label}
                            </SelectItem>
                        ))}
                    </SelectGroup>
                </SelectContent>
            </Select>
        </div>
    )
}
