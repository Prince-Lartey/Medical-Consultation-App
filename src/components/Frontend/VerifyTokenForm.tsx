"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { AlertCircle, Loader } from "lucide-react";
import { updateUserbyId } from "../../../actions/users";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSeparator,
    InputOTPSlot,
} from "@/components/ui/input-otp";
import { UserRole } from "@prisma/client";

const FormSchema = z.object({
    token: z.string().min(6, {
        message: "Your token must be 6 characters.",
    }),
});

export default function VerifyTokenForm({
    userToken,
    id,
    role
}: {
    userToken: number | undefined;
    id: string;
    role: UserRole | undefined;
}) {
    const [loading, setLoading] = useState(false);
    const [showNotification, setShowNotification] = useState(false);
    const router = useRouter();
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            token: "",
        },
    });

    async function onSubmit(data: z.infer<typeof FormSchema>) {
        setLoading(true);
        const userInputToken = parseInt(data.token);
        if (userInputToken === userToken) {
            setShowNotification(false);
            //Update User
            try {
                await updateUserbyId(id);
                setLoading(false);
                // reset();
                toast.success("Account Verified");
                if (role === "DOCTOR") {
                    router.push(`/onboarding/${id}`);
                } else {
                    router.push(`/login`);
                }
            } catch (error) {
                setLoading(false);
                console.log(error);
            }
        } else {
            setShowNotification(true);
            setLoading(false);
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6 flex flex-col items-center justify-center">
                {showNotification && (
                    <Alert variant="destructive">
                        <AlertCircle className="h-4 w-4" />
                        <AlertTitle>Wrong Code!</AlertTitle>
                        <AlertDescription>
                            Please Check the code and Enter again
                        </AlertDescription>
                    </Alert>
                )}
                <FormField
                    control={form.control}
                    name="token"
                    render={({ field }) => (
                        <FormItem className="">
                            <FormLabel>Enter Code Here</FormLabel>
                            <FormControl >
                                <InputOTP maxLength={6} {...field} >
                                    <InputOTPGroup>
                                        <InputOTPSlot index={0} />
                                        <InputOTPSlot index={1} />
                                        <InputOTPSlot index={2} />
                                    </InputOTPGroup>
                                    <InputOTPSeparator />
                                    <InputOTPGroup>
                                        <InputOTPSlot index={3} />
                                        <InputOTPSlot index={4} />
                                        <InputOTPSlot index={5} />
                                    </InputOTPGroup>
                                </InputOTP>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit" disabled={loading} className="">
                    {loading ? <span><Loader className="w-6 h-6 animate-spin" /> Verifying...</span> : "Submit"}
                </Button>
            </form>
        </Form>
    );
}