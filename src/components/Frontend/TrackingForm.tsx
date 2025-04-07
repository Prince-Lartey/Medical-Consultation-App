"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { AlertCircle, Loader } from "lucide-react";
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
import { Input } from "../ui/input";
import { getApplicationByTrack } from "../../../actions/onboarding";

export default function TrackingForm() {
    const [loading, setLoading] = useState(false);
    const [showNotification, setShowNotification] = useState(false);

    const router = useRouter();
    const FormSchema = z.object({
        trackingNumber: z.string().min(10, {
            message: "Tracking Number must be 10 characters.",
        }),
    })

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            trackingNumber: "",
        },
    })

    async function onSubmit(data: z.infer<typeof FormSchema>) {
        setLoading(true);
        try {
            const res = await getApplicationByTrack(data.trackingNumber);
            if (res?.status === 200) {
                setLoading(false);
                toast.success("Redirecting")
                router.push(`/onboarding/${res.data?.userId}?page=${res.data?.page}`)
            } else {
                setLoading(false);
                setShowNotification(true);
            }
        } catch (error) {
            setLoading(false);
            console.log(error);
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6 ">
                {showNotification && (
                    <Alert variant="destructive">
                        <AlertCircle className="h-4 w-4" />
                        <AlertTitle>Wrong Tracking Code!</AlertTitle>
                        <AlertDescription>
                            Please Check the code and Enter again
                        </AlertDescription>
                    </Alert>
                )}
                <FormField
                    control={form.control}
                    name="trackingNumber"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Tracking Number</FormLabel>
                            <FormControl>
                                <Input placeholder="eg: BDTLDQX68R" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit" disabled={loading} className="flex items-center">
                    {loading ? <span className="flex"><Loader className="w-5 h-5 animate-spin mr-2" /> Verifying...</span> : "Submit to Resume"}
                </Button>
            </form>
        </Form>
    );
}