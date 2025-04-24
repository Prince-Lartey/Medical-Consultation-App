"use server"

import { prismaClient } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { SymptomProps } from "@/components/Dashboard/SymptomForm";
import { Symptom } from "@prisma/client";

export async function createSymptom(data: Symptom) {
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
                title: "Anxiety",
                slug: "anxiety",
            },
            {
                title: "Depression",
                slug: "depression",
            },
            {
                title: "Asthma",
                slug: "asthma",
            },
            {
                title: "Erectile Dysfunction",
                slug: "erectile-dysfunction",
            },
            {
                title: "Back Pain",
                slug: "back-pain",
            },
            {
                title: "UTI",
                slug: "uti",
            },
            {
                title: "Flu, Cough or Cold",
                slug: "flu-cough-cold",
            },
            {
                title: "Acne",
                slug: "acne",
            },
            {
                title: "Tooth Pain",
                slug: "tooth-pain",
            },
            {
                title: "Vagina Itching",
                slug: "vagina-itching",
            },
            {
                title: "Skin Itching",
                slug: "skin-itching",
            },
            {
                title: "Ear Infection",
                slug: "ear-infection",
            },
            {
                title: "Sore Throat",
                slug: "sore-throat",
            },
            {
                title: "Rash",
                slug: "rash",
            },
            {
                title: "Migraine",
                slug: "migraine",
            },
            {
                title: "Diarrhea",
                slug: "diarrhea",
            },
            {
                title: "Eczema",
                slug: "eczema",
            },
            {
                title: "Dizziness",
                slug: "dizziness",
            },
            {
                title: "Fever",
                slug: "fever",
            },
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

export async function getSymptomBySlug(slug: string) {
    try {
        if (slug) {
            const symptom = await prismaClient.symptom.findUnique({
                where: {
                    slug,
                },
            });
            return {
                data: symptom,
                error: null,
                status: 200,
            };
        }else {
            return {
                data: null,
                error: "Symptom slug is required",
                status: 400,
            };
        }
    } catch (error) {
        console.error("Error fetching symptom:", error);
        return {
            data: null,
            error: "An error occurred while fetching the symptom",
            status: 500,
        };
    }
}

export async function updateSymptom(id: string, data: Symptom) {
    const { title, slug } = data;
    try {
        const existingSymptom = await prismaClient.symptom.findUnique({
            where: {
                slug,
            },
        });
        if (!existingSymptom) {
            return {
                data: null,
                error: 'Symptom not found',
                status: 409,
            };
        }

        const updatedSymptom = await prismaClient.symptom.update({
            where: {
                id,
            },
            data: {
                title,
                slug,
            },
        });
        revalidatePath("/dashboard/symptoms");

        return {
            data: updatedSymptom,
            error: null,
            status: 200,
        };
    } catch (error) {
        console.error("Error updating symptom:", error);
        return {
            data: null,
            error: "An error occurred while updating the symptom",
            status: 500,
        };
    }
}