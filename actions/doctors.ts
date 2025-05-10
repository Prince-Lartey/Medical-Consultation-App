"use server"

import { prismaClient } from "@/lib/db";
import { Doctor } from "../types/types";
import { DoctorProfile } from "@prisma/client";
import generateSlug from "@/utils/generateSlug";

export type serviceProps = {
    title: string
    slug: string
}

export type dataProps = {
    doctors: Doctor[]
    services: serviceProps[]
}

export type specialtyDataProps = {
    doctors: Doctor[]
    specialties: serviceProps[]
}

export async function getDoctorsByServiceSlug(slug: string) {
    try {
        let doctors: Doctor[] = []
        let services: serviceProps[] = []
        if (slug) {
            const service = await prismaClient.service.findUnique({
                where: {
                    slug,
                },
                include: {
                    doctorProfiles: {
                        include: {
                            availability: true
                        }
                    }
                },
            });
            doctors = service?.doctorProfiles.map((doctor: DoctorProfile) => {
                return {
                    id: doctor.userId,
                    name: `${doctor.firstName} ${doctor.lastName}`,
                    slug: generateSlug(`${doctor.firstName} ${doctor.lastName} `),
                    email: doctor.email,
                    phone: doctor.phone,
                    doctorProfile: doctor
                }
            })

            services = await prismaClient.service.findMany({
                where: {
                    id: {
                        not: service?.id
                    }
                }
            })

            const data: dataProps = {doctors, services}
            return data
        }

    } catch (error) {
        console.error("Error fetching service:", error);
        return []
    }
}

export async function getDoctorsBySpecialtySlug(slug: string) {
    try {
        let doctors: Doctor[] = []
        let specialties: serviceProps[] = []
        if (slug) {
            const specialty = await prismaClient.specialty.findUnique({
                where: {
                    slug,
                },
                include: {
                    doctorProfiles: {
                        include: {
                            availability: true
                        }
                    }
                },
            });
            doctors = specialty?.doctorProfiles.map((doctor: DoctorProfile) => {
                return {
                    id: doctor.userId,
                    name: `${doctor.firstName} ${doctor.lastName}`,
                    slug: generateSlug(`${doctor.firstName} ${doctor.lastName} `),
                    email: doctor.email,
                    phone: doctor.phone,
                    doctorProfile: doctor
                }
            })

            specialties = await prismaClient.specialty.findMany({
                where: {
                    id: {
                        not: specialty?.id
                    }
                }
            })

            const data: specialtyDataProps = {doctors, specialties}
            return data
        }

    } catch (error) {
        console.error("Error fetching service:", error);
        return []
    }
}
