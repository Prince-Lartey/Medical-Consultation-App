"use server"

import { prismaClient } from "@/lib/db";

export async function getDoctorsByServiceSlug(slug: string) {
    try {
        if (slug) {
            const service = await prismaClient.service.findUnique({
                where: {
                    slug,
                },
                include: {
                    doctors: {
                        include: {
                            doctorProfile: true,
                        },
                    },
                },
            });
            const doctors = service?.doctors
            return doctors ?? []
        }

    } catch (error) {
        console.error("Error fetching service:", error);
        return []
    }
}
