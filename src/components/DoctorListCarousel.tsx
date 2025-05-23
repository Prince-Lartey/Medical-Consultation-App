"use client";
import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import DoctorCard from "./DoctorCard";
import { Doctor } from "../../types/types";

// interface Doctor {
//     name: string;
// }

export default function DoctorListCarousel({ doctors, isInPerson }: { doctors: Doctor[]; isInPerson?: boolean }) {
    const responsive = {
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 3,
        slidesToSlide: 3, // optional, default to 1.
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 3,
            slidesToSlide: 2, // optional, default to 1.
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 2,
            slidesToSlide: 1, // optional, default to 1.
        },
    };
    return (
        <Carousel
            swipeable={false}
            draggable={false}
            showDots={true}
            responsive={responsive}
            ssr={true} // means to render carousel on server-side.
            infinite={true}
            autoPlay={true}
            autoPlaySpeed={5000}
            keyBoardControl={true}
            customTransition="all .5"
            transitionDuration={1000}
            containerClass="carousel-container"
            removeArrowOnDeviceType={["tablet", "mobile"]}
            // deviceType={}
            dotListClass="custom-dot-list-style"
            itemClass="px-4"
        >
            {
                doctors.map((doctor: Doctor, index: number) => {
                    return <DoctorCard doctor={doctor} key={index} isInPerson={isInPerson} />
                })
            }
        </Carousel>
    );
}