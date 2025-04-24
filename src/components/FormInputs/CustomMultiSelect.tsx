import { Label } from "../ui/label";
import { MultiSelect } from "react-multi-select-component";

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

export default function CustomMultiSelect({
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
            <MultiSelect
                options={options}
                value={selectedOptions}
                onChange={setSelectedOptions}
                labelledBy={optionTitle}
            />
        </div>
    )
}
