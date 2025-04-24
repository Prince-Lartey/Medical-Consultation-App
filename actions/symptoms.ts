"use server"

import { prismaClient } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { SymptomProps } from "@/components/Dashboard/SymptomForm";

export async function createSymptom(data: SymptomProps) {
    const { title, slug } = data;
    try {
        const existingSymptom = await prismaClient.symptom.findUnique({
            where: {
                slug,
            },
        });
        if (existingSymptom) {
            return {
                data: null,
                error: `symptom with this slug ( ${slug})  already exists in the Database`,
                status: 409,
            };
        }

        const newSymptom = await prismaClient.symptom.create({
            data: {
                title,
                slug,
            },
        });
        revalidatePath("/dashboard/symptoms");

        return {
            data: newSymptom,
            error: null,
            status: 200,
        };
    } catch (error) {
        console.error("Error creating symptom:", error);
        return {
            data: null,
            error: "An error occurred while creating the symptom",
            status: 500,
        };
    }
}

export async function createManySymptoms() {
    try {
        const symptoms = [
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

        for (const symptom of symptoms) {
            try {
                await createSymptom(symptom);
            }catch (error) {
                console.error(`Error creating symptom ${symptom.title}:`, error);
            }
        }
        
    } catch (error) {
        console.error("Error creating symptoms:", error);
        return {
            data: null,
            error: "An error occurred while creating the symptoms",
            status: 500,
        };
    }
}

export async function getSymptoms() {
    try {
        const symptoms = await prismaClient.symptom.findMany({
            orderBy: {
                createdAt: "desc",
            },
        });
        return {
            data: symptoms,
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

export async function deleteSymptom(id: string) {
    try {
        await prismaClient.symptom.delete({
            where: {
                id,
            },
        });
        revalidatePath("/dashboard/symptoms");

        return {
            ok: true,
            error: null,
            status: 200,
        };
    } catch (error) {
        console.error("Error deleting symptom:", error);
        return {
            data: null,
            error: "An error occurred while deleting the symptom",
            status: 500,
        };
    }
}