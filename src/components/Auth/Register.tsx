"use client"

import Link from "next/link";
import { useForm } from "react-hook-form"
import { RegisterInputProps } from "../../../types/types";
import SubmitButton from "../FormInputs/SubmitButton";
import { useState } from "react";
import { UserRole } from "@prisma/client";
import { createUser } from "../../../actions/users";
import toast from "react-hot-toast";
import TextInput from "../FormInputs/TextInput";
import { Button } from "../ui/button";
import Image from "next/image";

export default function Register({role="USER"}: {role?: UserRole}) {
    const {register, handleSubmit, reset, formState: { errors }} = useForm<RegisterInputProps>()
    const [isLoading, setIsLoading] = useState(false)

    async function onSubmit(data: RegisterInputProps) {
        setIsLoading(true)

        data.role = role
        
        try {
            const user = await createUser(data)
            if (user && user.status === 200) {
                // console.log(user.data)
                reset()
                toast.success("User Created Sucessfully!")
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
        <div className="w-full lg:grid h-screen lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
        <div className="flex items-center justify-center py-12">
            <div className="mx-auto grid w-[350px] gap-6">
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
                    name="fullname"
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
                
                <SubmitButton title="Login" buttonType="submit" loadingTitle="Logging In..." isLoading={isLoading}/>
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
        <div className="hidden bg-muted lg:block">
            <Image
            src="/bg1.jpg"
            alt="Image"
            width="1000"
            height="666"
            className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
            />
        </div>
        </div>
    )
}
