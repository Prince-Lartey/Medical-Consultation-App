"use server"

import { prismaClient } from "@/lib/db";
import bcrypt from "bcrypt";
import EmailTemplate from "@/components/Emails/email-template";
import {Resend} from "resend"
import { DoctorProfile } from "@prisma/client";

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

export async function getDoctorById(trackingNumber: string) {
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