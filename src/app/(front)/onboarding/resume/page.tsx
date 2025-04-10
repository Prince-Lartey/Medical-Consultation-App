import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
} from "@/components/ui/card"
import TrackingForm from "@/components/Frontend/TrackingForm";

export default async function VerifyTracking() {

    return (
        <div className=" h-screen flex items-center justify-center">
            <Card className="mx-auto">
                <CardHeader>
                    <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white text-center">
                        Resume your Application
                    </h1>                
                    <CardDescription>
                        Please Enter your 10-Character Tracking Code
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <TrackingForm/>
                </CardContent>
            </Card>
        </div>
    );
}

