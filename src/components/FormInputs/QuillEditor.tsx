
import React from "react";
import ReactQuill from "react-quill-new";
import "react-quill/dist/quill.snow.css";
import { Label } from "../ui/label";

export default function QuillEditor({
    label,
    className = "w-full",
    value,
    onChange,
}: {
    label: string;
    className: string;
    value: any;
    onChange: any;
}) {
    const modules = {
        toolbar: [
            [{ header: [1, 2, false] }],
            ["bold", "italic", "underline", "strike", "blockquote"],
            [{ list: "ordered" }, { list: "bullet" }],
            ["link", "color", "image"],
            [{ "code-block": true }],
            ["clean"],
        ],
    };
    const formats = [
        "header",
        "bold",
        "italic",
        "underline",
        "strike",
        "blockquote",
        "list",
        "bullet",
        "link",
        "indent",
        "image",
        "code-block",
        "color",
    ];
    return (
        <div className="w-[540px]">
            <Label
                htmlFor="content"
                className="block text-sm font-medium leading-6 text-gray-900 dark:text-slate-50 mb-2"
            >
                {label}
            </Label>
            <ReactQuill
                theme="snow"
                value={value}
                onChange={onChange}
                modules={modules}
                formats={formats}
            />
        </div>
    );
}