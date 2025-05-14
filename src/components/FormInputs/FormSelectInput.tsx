"use client";

import React from "react";
import Select from "react-tailwindcss-select";
import { Option, Options } from "react-tailwindcss-select/dist/components/type";
import { Label } from "../ui/label";
type FormSelectInputProps = {
    options: Options;
    label: string;
    option: Option;
    setOption: any;
    href?: string;
    labelShown?: boolean;
};
export default function FormSelectInput({
    options,
    label,
    option,
    setOption,
    labelShown = true,
}: FormSelectInputProps) {

    return (
        <div className="">
            {labelShown && (
                <Label>
                    Select {label}
                </Label>
            )}
            <div className="flex items-center space-x-2">
                <Select
                    isSearchable
                    primaryColor="blue"
                    value={option}
                    onChange={(item) => setOption(item)}
                    options={options}
                    placeholder={label}
                />
            </div>
        </div>
    );
}
