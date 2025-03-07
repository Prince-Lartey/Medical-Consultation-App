import { MailOpen } from "lucide-react"
import { Button } from "@/components/ui/button"

type CustomButtonProps = {
    title: string
}

export default function CustomButton({ title }: CustomButtonProps) {
    return (
        <Button>
            <MailOpen />
            {title}
        </Button>
    )
}
