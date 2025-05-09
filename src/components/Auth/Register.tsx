"use client"

import Link from "next/link";
import { useForm } from "react-hook-form"
import { RegisterInputProps } from "../../../types/types";
import SubmitButton from "../FormInputs/SubmitButton";
import { useState } from "react";
import { createUser } from "../../../actions/users";
import toast from "react-hot-toast";
import TextInput from "../FormInputs/TextInput";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

export default function Register({
    role="USER", 
    plan="",
}: {
    role?: string | string[] | undefined; 
    plan?: string | string[] | undefined; 
}) {
    
    const {register, handleSubmit, reset, formState: { errors }} = useForm<RegisterInputProps>()
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()

    async function onSubmit(data: RegisterInputProps) {
        setIsLoading(true)
        data.role = role
        data.plan = plan
        
        try {
            const user = await createUser(data)
            if (user && user.status === 200) {
                reset()
                toast.success("A verification code has been sent to your email!")
                router.push(`/verify-account/${user.data?.id}`)
                setIsLoading(false)
            }else {
                toast.error(user.error);
                console.log(user.error)
            }
            
        } catch (error) {
            console.log(error)
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="w-full h-screen lg:min-h-[600px] xl:min-h-[800px]">
            <div className="flex items-center justify-center py-12">
                <div className="mx-auto grid w-[450px] gap-6">
                <div className="grid gap-2 text-center">
                    <h1 className="text-3xl font-bold">Create Account</h1>
                    <p className="text-balance text-muted-foreground">
                        Enter your details below to create a new account
                    </p>
                </div>
                <form className="grid gap-4" onSubmit={handleSubmit(onSubmit)}>
                    <TextInput 
                        label="Full Name"
                        register={register}
                        name="fullName"
                        type="text"
                        errors={errors}
                        placeholder="eg: Prince Lartey"
                    />
                    <TextInput 
                        label="Email Address"
                        register={register}
                        name="email"
                        type="email"
                        errors={errors}
                        placeholder="eg: pl@gmail.com"
                    />
                    <TextInput 
                        label="Phone Number"
                        register={register}
                        name="phone"
                        type="phone"
                        errors={errors}
                        placeholder="eg: +233 54 123 4567"
                    />
                    <TextInput 
                        label="Password"
                        register={register}
                        name="password"
                        type="password"
                        errors={errors}
                        placeholder="******"
                    />
                    
                    <SubmitButton title="Create Account" buttonType="submit" loadingTitle="Please wait..." isLoading={isLoading}/>
                    <Button variant="outline" className="w-full">
                        Sign up with Google
                    </Button>
                </form>
                <div className="mt-4 text-center text-sm">
                    Do you already have an account?{" "}
                    <Link href="/login" className="underline">
                        Login
                    </Link>
                </div>
                </div>
            </div>
        </div>
    )
}
