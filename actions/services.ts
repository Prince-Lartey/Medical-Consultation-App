"use server"

import { prismaClient } from "@/lib/db";
import { ServiceProps } from "../types/types";
import { revalidatePath } from "next/cache";
import { Service } from "@prisma/client";

export async function createService(data: Service) {
    const { title, imageUrl, slug } = data;
    try {
        const existingService = await prismaClient.service.findUnique({
            where: {
                slug,
            },
        });
        if (existingService) {
            return {
                data: null,
                error: `Service with this slug ( ${slug})  already exists in the Database`,
                status: 409,
            };
        }

        const newService = await prismaClient.service.create({
            data: {
                title,
                imageUrl,
                slug,
            },
        });
        revalidatePath("/dashboard/services");

        return {
            data: newService,
            error: null,
            status: 200,
        };
    } catch (error) {
        console.error("Error creating service:", error);
        return {
            data: null,
            error: "An error occurred while creating the service",
            status: 500,
        };
    }
}

export async function createManyServices() {
    try {
        const services = [
            {
                title: "TeleHealth",
                imageUrl: "https://e1buy3qdez.ufs.sh/f/J6dncW3AVEReDHYl49QJTcsVbNzpkq0dEAj7noSFKX532U16",
                slug: "telehealth",
            },
            {
                title: "Video prescription refill",
                imageUrl: "https://e1buy3qdez.ufs.sh/f/J6dncW3AVEReJrxjmX3AVEReCXQnh9dMZW34zfyqD7g680Ta",
                slug: "video-prescription-refill",
            },
            {
                title: "In-person doctor visit",
                imageUrl: "https://e1buy3qdez.ufs.sh/f/J6dncW3AVEReLfykl4aVN5403sknpoXeWfZERdg1y8xAK2Du",
                slug: "in-person-doctor-visit",
            },
            {
                title: "UTI consult",
                imageUrl: "https://e1buy3qdez.ufs.sh/f/J6dncW3AVERe02JiQhwyGqSU4Ns6aXZxfPpO9LWoJ8HYuDim",
                slug: "uti-consult",
            },
            {
                title: "ED consult",
                imageUrl: "https://e1buy3qdez.ufs.sh/f/J6dncW3AVEReZpGS19fzXUgPMEsjV1HJcfmty9CnvIbrRBFA",
                slug: "ed-consult",
            },
            {
                title: "Mental health consult",
                imageUrl: "https://e1buy3qdez.ufs.sh/f/J6dncW3AVERewVmJOFnBquhUNRl1QHVZXmSK823sLCc9DYFr",
                slug: "mental-health-consult",
            }
        ]

        for (const service of services) {
            try {
                await createService(service);
            }catch (error) {
                console.error(`Error creating service ${service.title}:`, error);
            }
        }
        
    } catch (error) {
        console.error("Error creating services:", error);
        return {
            data: null,
            error: "An error occurred while creating the services",
            status: 500,
        };
    }
}

export async function getServices() {
    try {
        const services = await prismaClient.service.findMany({
            orderBy: {
                createdAt: "desc",
            },
        });
        return {
            data: services,
            error: null,
            status: 200,
        };
    } catch (error) {
        console.error("Error fetching services:", error);
        return {
            data: null,
            error: "An error occurred while fetching the services",
            status: 500,
        };
    }
}

export async function deleteService(id: string) {
    try {
        await prismaClient.service.delete({
            where: {
                id,
            },
        });
        revalidatePath("/dashboard/services");

        return {
            ok: true,
            error: null,
            status: 200,
        };
    } catch (error) {
        console.error("Error deleting service:", error);
        return {
            data: null,
            error: "An error occurred while deleting the service",
            status: 500,
        };
    }
}

export async function getServiceBySlug(slug: string) {
    try {
        if (slug) {
            const service = await prismaClient.service.findUnique({
                where: {
                    slug,
                },
            });
            return {
                data: service,
                error: null,
                status: 200,
            };
        }else {
            return {
                data: null,
                error: "Service ID is required",
                status: 400,
            };
        }

    } catch (error) {
        console.error("Error fetching service:", error);
        return {
            data: null,
            error: "An error occurred while fetching the service",
            status: 500,
        };
    }
}

export async function updateService(id: string, data: Service) {
    try {
        const { title, imageUrl, slug } = data;
        const existingService = await prismaClient.service.findUnique({
            where: {
                slug,
            },
        });
        if (!existingService) {
            return {
                data: null,
                error: `Service not found`,
                status: 404,
            };
        }
        const updatedService = await prismaClient.service.update({
            where: {
                id,
            },
            data: {
                title,
                imageUrl,
                slug,
            },
        });
        revalidatePath("/dashboard/services");

        return {
            data: updatedService,
            error: null,
            status: 200,
        };
    } catch (error) {
        console.error("Error updating service:", error);
        return {
            data: null,
            error: "An error occurred while updating the service",
            status: 500,
        };
    }
}