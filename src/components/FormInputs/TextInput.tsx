import React from 'react'
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import Link from 'next/link';

type TextInputProps = {
    label: string;
    register: any;
    name: string;
    errors: any;
    type?: string
    placeholder: string
}

export default function TextInput({ label, register, name, errors, type="text", placeholder }: TextInputProps) {
    return (
        <div>
            <div className="grid gap-2">
                {type === "password" ? (
                    <div className="flex items-center">
                        <Label htmlFor={`${name}`}>{label}</Label>
                        <Link
                            href="/forgot-password"
                            className="ml-auto inline-block text-sm underline"
                        >
                            Forgot your password?
                        </Link>
                    </div>
                ) : (
                    <Label htmlFor={`${name}`}>{label}</Label>
                )}

                <Input
                    {...register(`${name}`, {required: true})}
                    id={`${name}`}
                    name={`${name}`}
                    type={type}
                    placeholder={placeholder}
                />
                {errors[`${name}`] && <span className="text-red-500 text-sm">{label} is required</span>}
            </div>
        </div>
    )
}
