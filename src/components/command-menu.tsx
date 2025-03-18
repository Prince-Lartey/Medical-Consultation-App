// "use client"

// import * as React from "react"
// import { useRouter } from "next/navigation"
// import { type DialogProps } from "@radix-ui/react-dialog"
// import { Circle, File, Laptop, Moon, Search, Sun } from "lucide-react"
// import { useTheme } from "next-themes"
// import { cn } from "@/lib/utils"
// import { Button } from "./ui/button"
// import { docsConfig } from "../../config/doc"
// import { CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator } from "./ui/command"

// export function CommandMenu({ ...props }: DialogProps) {
//     const router = useRouter()
//     const [open, setOpen] = React.useState(false)
//     const { setTheme } = useTheme()

//     React.useEffect(() => {
//         const down = (e: KeyboardEvent) => {
//         if ((e.key === "k" && (e.metaKey || e.ctrlKey)) || e.key === "/") {
//             if (
//             (e.target instanceof HTMLElement && e.target.isContentEditable) ||
//             e.target instanceof HTMLInputElement ||
//             e.target instanceof HTMLTextAreaElement ||
//             e.target instanceof HTMLSelectElement
//             ) {
//             return
//             }

//             e.preventDefault()
//             setOpen((open) => !open)
//         }
//         }

//         document.addEventListener("keydown", down)
//         return () => document.removeEventListener("keydown", down)
//     }, [])

//     const runCommand = React.useCallback((command: () => unknown) => {
//         setOpen(false)
//         command()
//     }, [])

//     return (
//         <>
//         <Button
//             variant="outline"
//             className={cn("relative h-10 w-full justify-start rounded-[0.5rem] bg-muted/50 text-sm font-normal text-muted-foreground shadow-none sm:pr-12 md:w-40 lg:w-56 xl:w-64")}
//             onClick={() => setOpen(true)}
//             {...props}
//         >
//             <span className="hidden lg:inline-flex">Search documentation...</span>
//             <span className="inline-flex lg:hidden">Search...</span>
//             <kbd className="pointer-events-none absolute right-[0.3rem] top-[0.5rem] hidden h-5 select-none items-center gap-1 rounded px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
//                 <Search className="w-4 h-4 flex-shrink-0"/>
//             </kbd>
//         </Button>
//         <CommandDialog open={open} onOpenChange={setOpen}>
//             <CommandInput placeholder="Type a command or search..." />
//             <CommandList>
//             <CommandEmpty>No results found.</CommandEmpty>
//             <CommandGroup heading="Links">
//                 {docsConfig.mainNav
//                 .filter((navitem) => !navitem.external)
//                 .map((navItem) => (
//                     <CommandItem
//                     key={navItem.href}
//                     value={navItem.title}
//                     onSelect={() => {
//                         runCommand(() => router.push(navItem.href as string))
//                     }}
//                     >
//                     <File />
//                     {navItem.title}
//                     </CommandItem>
//                 ))}
//             </CommandGroup>
//             {docsConfig.sidebarNav.map((group) => (
//                 <CommandGroup key={group.title} heading={group.title}>
//                 {group.items.map((navItem) => (
//                     <CommandItem
//                     key={navItem.href}
//                     value={navItem.title}
//                     onSelect={() => {
//                         runCommand(() => router.push(navItem.href as string))
//                     }}
//                     >
//                     <div className="mr-2 flex h-4 w-4 items-center justify-center">
//                         <Circle className="h-3 w-3" />
//                     </div>
//                     {navItem.title}
//                     </CommandItem>
//                 ))}
//                 </CommandGroup>
//             ))}
//             <CommandSeparator />
//             <CommandGroup heading="Theme">
//                 <CommandItem onSelect={() => runCommand(() => setTheme("light"))}>
//                 <Sun />
//                 Light
//                 </CommandItem>
//                 <CommandItem onSelect={() => runCommand(() => setTheme("dark"))}>
//                 <Moon />
//                 Dark
//                 </CommandItem>
//                 <CommandItem onSelect={() => runCommand(() => setTheme("system"))}>
//                 <Laptop />
//                 System
//                 </CommandItem>
//             </CommandGroup>
//             </CommandList>
//         </CommandDialog>
//         </>
//     )
// }