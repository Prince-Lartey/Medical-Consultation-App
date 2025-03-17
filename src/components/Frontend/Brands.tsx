import React from "react";

export type Brand = {
    link: string,
    imageSrc: string, 
    lightImageSrc: string, 
    altText: string
}

const brandsData: Brand[] = [
    {
        imageSrc:
        "https://cdn.tailgrids.com/2.2/assets/images/brands/graygrids.svg",
        lightImageSrc:
        "https://cdn.tailgrids.com/2.2/assets/images/brands/graygrids-white.svg",
        altText: "graygrids",
        link: "#",
    },
    {
        imageSrc:
        "https://cdn.tailgrids.com/2.2/assets/images/brands/lineicons.svg",
        lightImageSrc:
        "https://cdn.tailgrids.com/2.2/assets/images/brands/lineIcons-white.svg",
        altText: "lineicons",
        link: "#",
    },
    {
        imageSrc: "https://cdn.tailgrids.com/2.2/assets/images/brands/uideck.svg",
        lightImageSrc:
        "https://cdn.tailgrids.com/2.2/assets/images/brands/uideck-white.svg",
        altText: "uideck",
        link: "#",
    },
    {
        imageSrc: "https://cdn.tailgrids.com/2.2/assets/images/brands/ayroui.svg",
        lightImageSrc:
        "https://cdn.tailgrids.com/2.2/assets/images/brands/ayroui-white.svg",
        altText: "ayroui",
        link: "#",
    },
];

const Brands: React.FC = () => {
    return (
        <section className="bg-slate-200 text-slate-800 dark:text-slate-200 py-10 lg:py-[50px] dark:bg-dark ">
            <h2 className="text-center pb-2 scroll-m-20 text-xl font-semibold tracking-tight">Trusted By:</h2>
            <div className="container mx-auto">
                <div className="-mx-4 flex flex-wrap">
                    <div className="w-full px-4">
                        <div className="flex flex-wrap items-center justify-center">
                            {brandsData.map((brand, i) => (
                                <SingleImage key={i} brand={brand} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Brands;

const SingleImage: React.FC<{ brand: Brand }> = ({ brand }) => {
    
    return (
        <a
            href={brand.link}
            className="mx-4 flex w-[150px] items-center justify-center py-5 2xl:w-[180px]"
        >
            <img src={brand.imageSrc} alt={brand.altText} className="h-10 w-full dark:hidden" />
            <img
            src={brand.lightImageSrc}
            alt={brand.altText}
            className="hidden h-10 w-full dark:block"
            />
        </a>
    );
};
