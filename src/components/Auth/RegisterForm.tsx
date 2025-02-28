"use client"

import Link from "next/link";
import { useForm } from "react-hook-form"
import { RegisterInputProps } from "../../../types/types";
import SubmitButton from "../FormInputs/SubmitButton";
import { useState } from "react";
import { UserRole } from "@prisma/client";
import { createUser } from "../../../actions/users";
import toast from "react-hot-toast";

export default function RegisterForm({role="USER"}: {role?: UserRole}) {
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
                console.log(user.error)
            }
            
        } catch (error) {
            console.log(error)
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
                    Create new Account
                </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                        <label htmlFor="fullName" className="block text-sm/6 font-medium text-gray-900">
                            Full name
                        </label>
                        <div className="mt-2">
                            <input
                                {...register("fullName", {required: true})}
                                id="fullName"
                                name="fullName"
                                type="text"
                                autoComplete="name"
                                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                            />
                            {errors.fullName && <span className="text-red-500 text-sm">Full Name is required</span>}
                        </div>
                    </div>
                    
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
                        <label htmlFor="phone" className="block text-sm/6 font-medium text-gray-900">
                            Phone Number
                        </label>
                        <div className="mt-2">
                            <input
                                {...register("phone", {required: true})}
                                id="phone"
                                name="phone"
                                type="tel"
                                autoComplete="phone"
                                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                            />
                            {errors.phone && <span className="text-red-500 text-sm">Phone Number is required</span>}
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">
                                Password
                            </label>
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
                    <SubmitButton title="Create Account" buttonType="submit" loadingTitle="Creating, please wait..." isLoading={isLoading} />

                </form>
    
                <p className="mt-10 text-center text-sm/6 text-gray-500">
                    Already have an Account?{' '}
                    <Link href="/login" className="font-semibold text-indigo-600 hover:text-indigo-500">
                        Login
                    </Link>
                </p>
            </div>
        </div>  
    )
}
