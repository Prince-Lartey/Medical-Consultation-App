"use server"

import { prismaClient } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { InboxProps } from "../types/types";

export async function createInboxMessage(data: InboxProps) {
    try {
        const newMessage = await prismaClient.inbox.create({
            data,
        });
        revalidatePath("/dashboard/doctor/inbox");

        return {
            data: newMessage,
            error: null,
            status: 201,
        };
    } catch (error) {
        console.error("Error creating message:", error);
        return {
            data: null,
            error: "An error occurred while creating the message",
            status: 500,
        };
    }
}

export async function getInboxMessage({receiverId: string}) {
    try {
        const messages = await prismaClient.inbox.findMany({
            orderBy: {
                createdAt: "desc",
            },
        });
        return {
            data: messages,
            error: null,
            status: 200,
        };
    } catch (error) {
        console.error("Error fetching messages:", error);
        return {
            data: null,
            error: "An error occurred while fetching the messages",
            status: 500,
        };
    }
}

export async function deleteMessage(id: string) {
    try {
        await prismaClient.inbox.delete({
            where: {
                id,
            },
        });
        revalidatePath("/dashboard/doctor/inbox");

        return {
            ok: true,
            error: null,
            status: 200,
        };
    } catch (error) {
        console.error("Error deleting message:", error);
        return {
            data: null,
            error: "An error occurred while deleting the message",
            status: 500,
        };
    }
}