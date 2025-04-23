"use server"

import { prismaClient } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { SpecialtyProps } from "@/components/Dashboard/SpecialtyForm";

export async function createSpecialty(data: SpecialtyProps) {
    const { title, slug } = data;
    try {
        const existingSpecialty = await prismaClient.specialty.findUnique({
            where: {
                slug,
            },
        });
        if (existingSpecialty) {
            return {
                data: null,
                error: `specialty with this slug ( ${slug})  already exists in the Database`,
                status: 409,
            };
        }

        const newSpecialty = await prismaClient.specialty.create({
            data: {
                title,
                slug,
            },
        });
        revalidatePath("/dashboard/specialties");

        return {
            data: newSpecialty,
            error: null,
            status: 200,
        };
    } catch (error) {
        console.error("Error creating specialty:", error);
        return {
            data: null,
            error: "An error occurred while creating the specialty",
            status: 500,
        };
    }
}

export async function createManySpecialties() {
    try {
        const specialties = [
            {
                title: "Primary Care",
                slug: "primary-care",
            },
            {
                title: "Dermatology",
                slug: "dermatology",
            },
            {
                title: "Pediatrics",
                slug: "pediatrics",
            },
            {
                title: "Men's Health",
                slug: "mens-health",
            },
            {
                title: "Women's Health",
                slug: "womens-health",
            },
            {
                title: "Dental",
                slug: "dental",
            }
        ]

        for (const specialty of specialties) {
            try {
                await createSpecialty(specialty);
            }catch (error) {
                console.error(`Error creating service ${specialty.title}:`, error);
            }
        }
        
    } catch (error) {
        console.error("Error creating specialties:", error);
        return {
            data: null,
            error: "An error occurred while creating the specialties",
            status: 500,
        };
    }
}

export async function getSpecialties() {
    try {
        const specialties = await prismaClient.specialty.findMany({
            orderBy: {
                createdAt: "desc",
            },
        });
        return {
            data: specialties,
            error: null,
            status: 200,
        };
    } catch (error) {
        console.error("Error fetching specialties:", error);
        return {
            data: null,
            error: "An error occurred while fetching the specialties",
            status: 500,
        };
    }
}

export async function deleteSpecialty(id: string) {
    try {
        await prismaClient.specialty.delete({
            where: {
                id,
            },
        });
        revalidatePath("/dashboard/specialties");

        return {
            ok: true,
            error: null,
            status: 200,
        };
    } catch (error) {
        console.error("Error deleting specialty:", error);
        return {
            data: null,
            error: "An error occurred while deleting the specialty",
            status: 500,
        };
    }
}