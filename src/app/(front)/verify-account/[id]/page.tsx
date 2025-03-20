import VerifyTokenForm from "@/components/Frontend/VerifyTokenForm";
import { getUserById } from "../../../../../actions/users";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
} from "@/components/ui/card"

export default async function VerifyAccount({
    params,
}: {
    params: Promise<{ id: string }>;
}) {

    const { id } = await params

    //Get a User
    const user = await getUserById(id);
    const userToken = user?.token;
    const role = user?.role;

    return (
        <div className=" h-screen flex items-center justify-center">
            <Card className="mx-auto max-w-sm">
                <CardHeader>
                    <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white text-center">
                        Verify Account
                    </h1>                
                    <CardDescription>
                        Please enter the 6-digit code sent to your email - {user.email}.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <VerifyTokenForm role={role} userToken={userToken} id={id} />
                </CardContent>
            </Card>
        </div>
    );
}

