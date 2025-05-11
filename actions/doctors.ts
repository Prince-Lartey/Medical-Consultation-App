"use server"

import { prismaClient } from "@/lib/db";
import { Doctor } from "../types/types";
import { DoctorProfile } from "@prisma/client";
import generateSlug from "@/utils/generateSlug";

export type serviceProps = {
    title: string
    slug: string
    id?: string
}

export type dataProps = {
    doctors: Doctor[]
    services: serviceProps[]
}

export type specialtyDataProps = {
    doctors: Doctor[]
    specialties: serviceProps[]
}

export type symptomDataProps = {
    doctors: Doctor[]
    symptoms: serviceProps[]
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

export async function getDoctorsBySymptomId(symptomId: string) {
    try {
        if (symptomId) {
            let doctors: Doctor[] = []
            let symptoms: serviceProps[] = []
            const doctorProfiles = await prismaClient.doctorProfile.findMany({
                where: {
                    symptomIds: {
                        has: symptomId,
                    }
                },
                include: {
                    availability: true
                }
            })
            doctors = doctorProfiles.map((doctor: DoctorProfile) => {
                return {
                    id: doctor.userId,
                    name: `${doctor.firstName} ${doctor.lastName}`,
                    slug: generateSlug(`${doctor.firstName} ${doctor.lastName} `),
                    email: doctor.email,
                    phone: doctor.phone,
                    doctorProfile: doctor
                }
            })

            symptoms = await prismaClient.symptom.findMany({
                where: {
                    id: {
                        not: symptomId
                    }
                }
            })

            const data: symptomDataProps = {doctors, symptoms}
            return data
        }

    } catch (error) {
        console.error("Error fetching service:", error);
        return []
    }
}

export async function getDoctorsBySearch(query: string) {
    if (query) {
        const services = await prismaClient.service.findMany({
            where: {
                OR: [
                    { title: { contains: query, mode: 'insensitive' }},
                    { slug: { contains: query, mode: 'insensitive' }}
                ]
            },
            select: {
                id: true,
                title: true,
                slug: true,
                imageUrl: true,
                _count: {
                    select: {
                        doctorProfiles: true
                    }
                }
            }
        })
        const symptoms = await prismaClient.symptom.findMany({
            where: {
                OR: [
                    { title: { contains: query, mode: 'insensitive' }},
                    { slug: { contains: query, mode: 'insensitive' }}
                ]
            }
        })
        const specialties = await prismaClient.specialty.findMany({
            where: {
                OR: [
                    { title: { contains: query, mode: 'insensitive' }},
                    { slug: { contains: query, mode: 'insensitive' }}
                ]
            }
        })
        const doctorProfiles = await prismaClient.doctorProfile.findMany({
            where: {
                OR: [
                    { firstName: { contains: query, mode: 'insensitive' }},
                    { lastName: { contains: query, mode: 'insensitive' }},
                    { servicesOffered: { hasSome: [query]}},
                ]
            },
            include: {
                availability: true
            },
        })
        const doctors = doctorProfiles.map((doctor: DoctorProfile) => {
            return {
                id: doctor.userId,
                name: `${doctor.firstName} ${doctor.lastName}`,
                slug: generateSlug(`${doctor.firstName} ${doctor.lastName} `),
                email: doctor.email,
                phone: doctor.phone,
                doctorProfile: doctor
            }
        })

        return {
            services,
            symptoms,
            specialties,
            doctors,
        }
    }
}
