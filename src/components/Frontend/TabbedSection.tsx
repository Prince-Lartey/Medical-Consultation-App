import React from "react";
import TabbedItems from "./TabbedItems";

const TabbedSection = () => {
    return (
        <section className="pb-12 pt-10 bg-gray-200 lg:pb-[90px] lg:pt-620px]">
            <div className="container mx-auto">
                <div className="-mx-4 flex flex-wrap">
                    <div className="w-full px-4">
                        <div className="mx-auto mb-12 max-w-5xl text-center lg:mb-20">
                            <h2 className="mb-3 text-3xl font-bold leading-[1.2] text-dark dark:text-white sm:text-4xl md:text-[30px]">
                                Connect with Top-Rated Doctors & Specialists Anytime!
                            </h2>
                            <p className="text-base text-body-color dark:text-dark-6">
                                Expert care is just a click away. Choose from thousands of trusted providers at prices that fit your budget. Book your appointment online today!
                            </p>
                        </div>
                    </div>
                </div>
                
                <div className="border">
                    <TabbedItems />
                </div>
            </div>
        </section>
    );
};

export default TabbedSection;;
