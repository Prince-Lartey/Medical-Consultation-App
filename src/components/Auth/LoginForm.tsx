"use client"

import Link from "next/link";
import SubmitButton from "../FormInputs/SubmitButton";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { LoginInputProps } from "../../../types/types";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import toast from "react-hot-toast";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react";

export default function LoginForm() {
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
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <img
                    alt="Your Company"
                    src="/PriMed1.png"
                    className="mx-auto h-12 w-auto"
                />
                <h2 className="text-center text-2xl/9 font-bold tracking-tight text-gray-900">
                    Sign in to your account
                </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    {showNotification && (
                        <Alert variant="destructive">
                            <AlertCircle className="h-4 w-4" />
                            <AlertTitle>Sign-in error!</AlertTitle>
                            <AlertDescription>
                                Please check your credentials
                            </AlertDescription>
                        </Alert>
                    )}
                    <div>
                        <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
                            Email address
                        </label>
                        <div className="mt-2">
                            <input
                                {...register("email", {required: true})}
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                            />
                            {errors.email && <span className="text-red-500 text-sm">Email is required</span>}
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">
                                Password
                            </label>
                            <div className="text-sm">
                                <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                                    Forgot password?
                                </a>
                            </div>
                        </div>
                        <div className="mt-2">
                            <input
                                {...register("password", {required: true})}
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                            />
                            {errors.password && <span className="text-red-500 text-sm">Password is required</span>}
                        </div>
                    </div>
                    <SubmitButton title="Login" buttonType="submit" loadingTitle="Logging In..." isLoading={isLoading} />
                </form>
    
                <p className="mt-10 text-center text-sm/6 text-gray-500">
                    Don&apos;t have an Account?{' '}
                    <Link href="/register" className="font-semibold text-indigo-600 hover:text-indigo-500">
                        Register
                    </Link>
                </p>
            </div>
        </div>  
    )
}
