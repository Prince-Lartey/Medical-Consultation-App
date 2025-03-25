import { Loader2 } from 'lucide-react';
import React from 'react'
import { Button } from '../ui/button';

type SubmitButtonProps ={
    title: string;
    buttonType?: "button" | "submit" | "reset" | undefined;
    isLoading: boolean;
    loadingTitle: string;
}

export default function SubmitButton({ title, buttonType="submit", isLoading=false, loadingTitle }: SubmitButtonProps) {
    return (
        <div>
            {isLoading ? (
                <Button disabled className="w-full">
                    <Loader2 className="animate-spin" />
                    {loadingTitle}
                </Button>
            ): (
                <Button type={buttonType} className="">
                    {title}
                </Button>
            )}
        </div>
    )
}
