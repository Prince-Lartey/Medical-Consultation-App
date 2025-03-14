
import Link from "next/link"
import { MobileNav } from "@/components/mobile-nav"
import { Button } from "@/components/ui/button"
// import { siteConfig } from "../../config/site"
import ModeToggle from "./ModeToggle"

import { MainNav } from "./main-nav"
import { CommandMenu } from "./command-menu"

export function SiteHeader() {
    return (
        <header className="border-grid sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="flex h-14 items-center gap-2 md:gap-4 px-10">
                <MainNav />
                <MobileNav />
                <div className="ml-auto flex items-center gap-2 md:flex-1 md:justify-end">
                <div className="hidden w-full flex-1 md:flex md:w-auto md:flex-none">
                    <CommandMenu />
                </div>
                <nav className="flex items-center gap-4">
                    <Button>
                        <Link href="/login">
                            Login
                        </Link>
                    </Button>
                    <ModeToggle />
                </nav>
                </div>
            </div>

        </header>
    )
}
