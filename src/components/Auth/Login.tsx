"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import SubmitButton from "../FormInputs/SubmitButton"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { LoginInputProps } from "../../../types/types"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"
import { signIn } from "next-auth/react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react";
import TextInput from "../FormInputs/TextInput"

export default function Login() {
    const {register, handleSubmit, reset, formState: { errors }} = useForm<LoginInputProps>()
    const [isLoading, setIsLoading] = useState(false)
    const [showNotification, setShowNotification] = useState(false);
    const router = useRouter();

    async function onSubmit (data: LoginInputProps) {
        try {
            setIsLoading(true);
            console.log("Attempting to sign in with credentials:", data);
            const loginData = await signIn("credentials", {
                ...data,
                redirect: false,
            });
            console.log("SignIn response:", loginData);
            if (loginData?.error) {
                setIsLoading(false);
                toast.error("Sign-in error: Check your credentials");
                setShowNotification(true);
            } else {
                // Sign-in was successful
                setShowNotification(false);
                reset();
                setIsLoading(false);
                toast.success("Login Successful");
                router.push("/dashboard");
            }
        } catch (error) {
            setIsLoading(false);
            console.error("Network Error:", error);
            toast.error("Its seems something is wrong with your Network");
        }
    }

    return (
        <div className="w-full h-screen lg:min-h-[600px] xl:min-h-[800px]">
            <div className="flex items-center justify-center py-12">
                <div className="mx-auto grid w-[450px] gap-6">
                    <div className="grid gap-2 text-center">
                        <h1 className="text-3xl font-bold">Login</h1>
                        <p className="text-balance text-muted-foreground">
                            Enter your email below to login to your account
                        </p>
                    </div>
                    <form className="grid gap-4" onSubmit={handleSubmit(onSubmit)}>
                        {showNotification && (
                            <Alert variant="destructive">
                                <AlertCircle className="h-4 w-4" />
                                <AlertTitle>Sign-in error!</AlertTitle>
                                <AlertDescription>
                                    Please check your credentials
                                </AlertDescription>
                            </Alert>
                        )}
                        
                        <TextInput 
                            label="Email Address"
                            register={register}
                            name="email"
                            type="email"
                            errors={errors}
                            placeholder="Eg: pl@gmail.com"
                        />
                        <TextInput 
                            label="Password"
                            register={register}
                            name="password"
                            type="password"
                            errors={errors}
                            placeholder="******"
                            page="login"
                        />
                        
                        <SubmitButton title="Login" buttonType="submit" loadingTitle="Logging In..." isLoading={isLoading}/>
                        <Button variant="outline" className="w-full">
                        Login with Google
                        </Button>
                    </form>
                    <div className="mt-4 text-center text-sm">
                        Don&apos;t have an account?{" "}
                        <Link href="/register" className="underline">
                            Sign up
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
