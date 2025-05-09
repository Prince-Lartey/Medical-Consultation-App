"use server"

import { prismaClient } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { Specialty } from "@prisma/client";

export async function createSpecialty(data: Specialty) {
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

// export async function createManySpecialties() {
//     try {
//         const specialties = [
//             {
//                 title: "Primary Care",
//                 slug: "primary-care",
//             },
//             {
//                 title: "Dermatology",
//                 slug: "dermatology",
//             },
//             {
//                 title: "Pediatrics",
//                 slug: "pediatrics",
//             },
//             {
//                 title: "Men's Health",
//                 slug: "mens-health",
//             },
//             {
//                 title: "Women's Health",
//                 slug: "womens-health",
//             },
//             {
//                 title: "Dental",
//                 slug: "dental",
//             }
//         ]

//         for (const specialty of specialties) {
//             try {
//                 await createSpecialty(specialty);
//             }catch (error) {
//                 console.error(`Error creating service ${specialty.title}:`, error);
//             }
//         }
        
//     } catch (error) {
//         console.error("Error creating specialties:", error);
//         return {
//             data: null,
//             error: "An error occurred while creating the specialties",
//             status: 500,
//         };
//     }
// }

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

export async function getSpecialtyBySlug(slug: string) {
    try {
        if (slug) {
            const specialty = await prismaClient.specialty.findUnique({
                where: {
                    slug,
                },
            });
            return {
                data: specialty,
                error: null,
                status: 200,
            };
        }else {
            return {
                data: null,
                error: "Specialty is required",
                status: 400,
            };
        }
    } catch (error) {
        console.error("Error fetching specialty:", error);
        return {
            data: null,
            error: "An error occurred while fetching the specialty",
            status: 500,
        };
    }
}

export async function updateSpecialty(id: string, data: Specialty) {
    const { title, slug } = data;
    try {
        const existingSpecialty = await prismaClient.specialty.findUnique({
            where: {
                id,
            },
        });
        if (!existingSpecialty) {
            return {
                data: null,
                error: "Specialty not found",
                status: 404,
            };
        }

        const updatedSpecialty = await prismaClient.specialty.update({
            where: {
                id,
            },
            data: {
                title,
                slug,
            },
        });
        revalidatePath("/dashboard/specialties");

        return {
            data: updatedSpecialty,
            error: null,
            status: 200,
        };
    } catch (error) {
        console.error("Error updating specialty:", error);
        return {
            data: null,
            error: "An error occurred while updating the specialty",
            status: 500,
        };
    }
}