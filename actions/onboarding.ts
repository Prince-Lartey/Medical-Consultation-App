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
        return newProfile

    } catch (error) {
        console.log("Error in createUser:", error);        
        return {
            error: "Something went wrong"
        }
        
    }
}