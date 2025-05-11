"use client"

import Link from "next/link"
import { MobileNav } from "@/components/mobile-nav"
import { Button } from "@/components/ui/button"
// import { siteConfig } from "../../config/site"
import ModeToggle from "./ModeToggle"
import { MainNav } from "./main-nav"
// import { CommandMenu } from "./command-menu"
import { Session } from "next-auth"
import { useRouter } from "next/navigation"
import { signOut } from "next-auth/react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import { generateInitials } from "@/utils/generateInitials"
import SearchBar from "./Frontend/SearchBar"

export function SiteHeader({session}: {session: Session | null}) {
    const user = session?.user
    const initials = generateInitials(user?.name)
    const router = useRouter()

    async function handleLogout() {
        await signOut()
        router.push("/login")
    }

    return (
        <header className="border-grid sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="flex h-14 items-center gap-2 md:gap-4 px-10">
                <MainNav />
                <MobileNav />
                <div className="ml-auto flex items-center gap-2 md:flex-1 md:justify-end">
                <div className="w-full flex-1 md:flex md:w-auto md:flex-none">
                    <SearchBar />
                </div>
                <nav className="flex items-center gap-4">
                    {session && session.user && user?.email ? (
                        <DropdownMenu >
                            <DropdownMenuTrigger asChild>
                                <Avatar className="cursor-pointer">
                                    {user.image ? (
                                        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                                    ) : (
                                        <AvatarFallback>{initials}</AvatarFallback>
                                    )}
                                </Avatar>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuLabel>{user.name}</DropdownMenuLabel>
                                <DropdownMenuLabel className="text-sm text-gray-500">{user.email}</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>
                                    <Link href="/dashboard">Dashboard</Link>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem onClick={() => handleLogout()} className="cursor-pointer">Logout</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    ) : (
                        <Button>
                            <Link href="/login">
                                Login
                            </Link>
                        </Button>
                    )}

                    <ModeToggle />
                </nav>
                </div>
            </div>

        </header>
    )
}
