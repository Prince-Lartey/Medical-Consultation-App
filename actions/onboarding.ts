"use server"

import { prismaClient } from "@/lib/db";
import {Resend} from "resend"
import { DoctorProfile } from "@prisma/client";
import WelcomeEmail from "@/components/Emails/welcome-email";

export async function createDoctorProfile(formData: any) {
    const { firstName, lastName, middleName, page, dob, trackingNumber, userId, gender } = formData;
    try {
        const newProfile = await prismaClient.doctorProfile.create({
            data: {
                firstName,
                lastName,
                middleName,
                dob,
                trackingNumber,
                gender,
                userId,
                page,
            },
        });
        
        console.log(newProfile)
        return {
            data: newProfile,
            error: null,
            status: 201,
        };

    } catch (error) {
        console.log("Error in createUser:", error);        
        return {
            data: null,
            status: 500,
            error: "Something went wrong"
        }
        
    }
}

export async function updateDoctorProfile(id: string | undefined, data: any) {
    if (id) {
        try {
            const updatedProfile = await prismaClient.doctorProfile.update({
                where: {
                    id,
                },
                data
            });
            return {
                data: updatedProfile,
                error: null,
                status: 201,
            };
        } catch (error) {
            console.log(error);
            return {
                data: null,
                status: 500,
                error: "Profile was not updated"
            }
        }
    }
}

export async function getApplicationByTrack(trackingNumber: string) {
    if (trackingNumber) {
        try {
            const existingProfile = await prismaClient.doctorProfile.findUnique({
                where: {
                    trackingNumber,
                },
            });
            if (!existingProfile) {
                return {
                    data: null,
                    error: "Wrong Tracking Number",
                    status: 404,
                };
            }
            return {
                data: existingProfile,
                error: null,
                status: 200,
            };
        } catch (error) {
            console.log(error);
            return {
                data: null,
                status: 500,
                error: "Something went wrong"
            }
        }
    }
}

export async function completeProfile(id: string | undefined, data: any) {
    if (id) {
        try {
            const existingProfile = await prismaClient.doctorProfile.findUnique({
                where: {
                    id,
                },
            });
            if (!existingProfile) {
                return {
                    data: null,
                    status: 500,
                    error: "Profile Not Found"
                }
            }

            const firstName = existingProfile.firstName;
            const email = existingProfile.email as string
            const previewText = "Welcome to PriMed";
            const message = "Thank you for joining PriMed. We are so grateful to have you onboard.";

            const resend = new Resend(process.env.RESEND_API_KEY)
            await resend.emails.send({
                from: "PriMed <info@pricorp.info>",
                to: email,
                subject: "Welcome to PriMed",
                react: WelcomeEmail({ firstName, previewText, message }),
            });
            const updatedProfile = await prismaClient.doctorProfile.update({
                where: {
                    id,
                },
                data
            });
            return {
                data: updatedProfile,
                error: null,
                status: 201,
            };
        } catch (error) {
            console.log(error);
            return {
                data: null,
                status: 500,
                error: "Profile was not updated"
            }
        }
    }
}

export async function getDoctorProfileById(userId: string | undefined) {
    if (userId) {
        try {
            const profile = await prismaClient.doctorProfile.findUnique({
                where: {
                    userId,
                },
                include: {
                    availability: true,
                }
            });
            return {
                data: profile,
                error: null,
                status: 200,
            };
        } catch (error) {
            console.log(error);
            return {
                data: null,
                status: 500,
                error: "Profile was not found"
            }
        }
    }
}

export async function createAvailability(formData: any) {
    try {
        const newAvailability = await prismaClient.availability.create({data});
        
        console.log(newAvailability)
        return newAvailability

    } catch (error) {
        console.log("Error in createUser:", error);        
        return {
            data: null,
            status: 500,
            error: "Something went wrong"
        }
        
    }
}