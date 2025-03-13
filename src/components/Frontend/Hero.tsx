import Link from "next/link";
import React from "react";
import TransitionalText from "./TransitionalText";
import { PillIcon } from "lucide-react";
import { CommandMenu } from "../command-menu";

    const Hero = () => {
        return (
            <div className="bg-blue-950 ">
                <div className="relative pb-[110px] pt-[50px] dark:bg-dark lg:pt-[50px] max-w-6xl mx-auto">
                    <div className="container">
                    <div className="-mx-4 flex flex-wrap">
                        <div className="w-full px-4 lg:w-5/12">
                        <div className="hero-content">
                            <h1 className="mb-5 text-4xl font-bold !leading-[1.208] text-gray-50 dark:text-white sm:text-[42px] lg:text-[40px] xl:text-5xl">
                                Book a Session <br />with a Trusted <TransitionalText />    
                            </h1>
                            <p className="mb-8 max-w-[480px] text-base text-gray-200 dark:text-dark-6">
                                Healthcare should be simple, not stressful. We cut through the hassle and hidden costs to bring you easy, affordable, and transparent access to doctors anytime, anywhere. No waiting rooms, no surprises, just quality care at your fingertips.
                            </p>

                            {/* Search bar here */}
                            {/* <SearchBar /> */}
                            <div className="hidden w-full flex-1 md:flex md:w-auto md:flex-none">
                                <CommandMenu />
                            </div>
                            {/* CTA here */}

                            <ul className="flex flex-wrap items-center mt-6">
                                <li>
                                    <Link href="/#" className="inline-flex items-center justify-center rounded-md bg-cyan-300 px-4 py-3 text-center text-base font-medium text-blue-950 hover:bg-cyan-500 lg:px-4" >
                                        Need a Doctor Urgently
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/#" className="inline-flex items-center justify-center px-5 py-3 text-center text-base font-medium text-gray-50 hover:text-cyan-300 dark:text-white" >
                                        <span className="mr-2">
                                            <PillIcon className="flex-shrink-0 h-4 w-4"/>
                                        </span>
                                        I need a Prescription refill
                                    </Link>
                                </li>
                            </ul>

                            <div className="py-4 flex gap-4 pt-8">
                                <div className='flex flex-col items-center jstify-center'>
                                    <span className="font-bold text-gray-50 text-2xl">600</span>
                                    <span className="text-xs text-gray-400" >Active Specialists</span>
                                </div>

                                <div className="border-r border-gray-400"></div>

                                <div className='flex flex-col items-center jstify-center'>
                                    <span className="font-bold text-gray-50 text-2xl">1800</span>
                                    <span className="text-xs text-gray-400" >Active Patients</span>
                                </div>
                            </div>
                        </div>
                        </div>
                        <div className="hidden px-4 lg:block lg:w-1/12"></div>
                        <div className="w-full px-4 lg:w-6/12">
                        <div className="lg:ml-auto lg:text-right">
                            <div className="relative z-10 inline-block pt-11 lg:pt-0">
                            <img
                                src="https://cdn.tailgrids.com/1.0/assets/images/hero/hero-image-01.png"
                                alt="hero"
                                className="max-w-full lg:ml-auto"
                            />
                            <span className="absolute -bottom-8 -left-8 z-[-1]">
                                <svg
                                width="93"
                                height="93"
                                viewBox="0 0 93 93"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                >
                                <circle cx="2.5" cy="2.5" r="2.5" fill="#3056D3" />
                                <circle cx="2.5" cy="24.5" r="2.5" fill="#3056D3" />
                                <circle cx="2.5" cy="46.5" r="2.5" fill="#3056D3" />
                                <circle cx="2.5" cy="68.5" r="2.5" fill="#3056D3" />
                                <circle cx="2.5" cy="90.5" r="2.5" fill="#3056D3" />
                                <circle cx="24.5" cy="2.5" r="2.5" fill="#3056D3" />
                                <circle cx="24.5" cy="24.5" r="2.5" fill="#3056D3" />
                                <circle cx="24.5" cy="46.5" r="2.5" fill="#3056D3" />
                                <circle cx="24.5" cy="68.5" r="2.5" fill="#3056D3" />
                                <circle cx="24.5" cy="90.5" r="2.5" fill="#3056D3" />
                                <circle cx="46.5" cy="2.5" r="2.5" fill="#3056D3" />
                                <circle cx="46.5" cy="24.5" r="2.5" fill="#3056D3" />
                                <circle cx="46.5" cy="46.5" r="2.5" fill="#3056D3" />
                                <circle cx="46.5" cy="68.5" r="2.5" fill="#3056D3" />
                                <circle cx="46.5" cy="90.5" r="2.5" fill="#3056D3" />
                                <circle cx="68.5" cy="2.5" r="2.5" fill="#3056D3" />
                                <circle cx="68.5" cy="24.5" r="2.5" fill="#3056D3" />
                                <circle cx="68.5" cy="46.5" r="2.5" fill="#3056D3" />
                                <circle cx="68.5" cy="68.5" r="2.5" fill="#3056D3" />
                                <circle cx="68.5" cy="90.5" r="2.5" fill="#3056D3" />
                                <circle cx="90.5" cy="2.5" r="2.5" fill="#3056D3" />
                                <circle cx="90.5" cy="24.5" r="2.5" fill="#3056D3" />
                                <circle cx="90.5" cy="46.5" r="2.5" fill="#3056D3" />
                                <circle cx="90.5" cy="68.5" r="2.5" fill="#3056D3" />
                                <circle cx="90.5" cy="90.5" r="2.5" fill="#3056D3" />
                                </svg>
                            </span>
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        );
};

export default Hero;
