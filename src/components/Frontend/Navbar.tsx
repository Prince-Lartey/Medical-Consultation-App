'use client'

import { useState } from 'react'
import {
    Dialog,
    DialogPanel,
    PopoverGroup,
} from '@headlessui/react'
import {
    Bars3Icon,
    XMarkIcon,
} from '@heroicons/react/24/outline'
import Link from 'next/link'

export default function Navbar() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    return (
        <header className="fixed top-0 bg-blue-950 border-b border-gray-400/30 w-full z-50">
        <nav aria-label="Global" className="mx-auto flex max-w-7xl items-center justify-between p-4 lg:px-8">
            <div className="flex lg:flex-1">
            <a href="#" className="-m-1.5 p-1.5">
                <img
                    alt=""
                    src="/PriMed2.png"
                    className="h-[50px] "
                />
            </a>
            </div>
            <div className="flex lg:hidden">
                <button
                    type="button"
                    onClick={() => setMobileMenuOpen(true)}
                    className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-50"
                >
                    <span className="sr-only">Open main menu</span>
                    <Bars3Icon aria-hidden="true" className="size-6" />
                </button>
            </div>
            <PopoverGroup className="hidden lg:flex lg:gap-x-12">
                <a href="#" className="text-sm/6 font-semibold text-gray-50">
                    Features
                </a>
                <a href="#" className="text-sm/6 font-semibold text-gray-50">
                    Marketplace
                </a>
                <a href="#" className="text-sm/6 font-semibold text-gray-50">
                    Company
                </a>
            </PopoverGroup>
            <div className="hidden lg:flex lg:flex-1 lg:justify-end">
                <a href="/login" className="text-sm/6 font-bold text-gray-900 bg-cyan-300 py-3 px-6 rounded-md">
                    Log in <span aria-hidden="true">&rarr;</span>
                </a>
            </div>
        </nav>
        <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden text-gray-50">
            <div className="fixed inset-0 z-10" />
            <DialogPanel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-blue-950 px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
                <a href="#" className="-m-1.5 p-1.5">
                <span className="sr-only">Your Company</span>
                <img
                    alt=""
                    src="https://tailwindui.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
                    className="h-8 w-auto"
                />
                </a>
                <button
                    type="button"
                    onClick={() => setMobileMenuOpen(false)}
                    className="-m-2.5 rounded-md p-2.5 text-gray-50"
                >
                    <span className="sr-only">Close menu</span>
                    <XMarkIcon aria-hidden="true" className="size-6" />
                </button>
            </div>
            <div className="mt-6 flow-root">
                <div className="-my-6 divide-y divide-gray-300/20">
                    <div className="space-y-2 py-6">
                        <a href="#" className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-50 hover:bg-gray-500">
                            Features
                        </a>
                        <a href="#" className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-50 hover:bg-gray-500">
                            Marketplace
                        </a>
                        <a href="#" className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-50 hover:bg-gray-500" >
                            Company
                        </a>
                    </div>
                <div className="py-6">
                    <Link
                        href="/login"
                        className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-gray-50 hover:bg-gray-50"
                    >
                        Log in
                    </Link>
                </div>
                </div>
            </div>
            </DialogPanel>
        </Dialog>
        </header>
    )
}
