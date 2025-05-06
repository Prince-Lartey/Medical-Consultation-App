"use server"

import { prismaClient } from "@/lib/db";
import { RegisterInputProps } from "../types/types";
import bcrypt from "bcrypt";
import EmailTemplate from "@/components/Emails/email-template";
import {Resend} from "resend"
import generateSlug from "@/utils/generateSlug";

export async function createUser(formData: RegisterInputProps) {
    const { fullName, email, phone, role, password, plan } = formData;
    try {
        const existingUser = await prismaClient.user.findUnique({
            where: {
                email,
            },
        });
        if (existingUser) {
            return {
                data: null,
                error: `User with this email ( ${email})  already exists in the Database`,
                status: 409,
            };
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        //Generate Token
        const generateToken = () => {
            const min = 100000; // Minimum 6-figure number
            const max = 999999; // Maximum 6-figure number
            return Math.floor(Math.random() * (max - min + 1)) + min;
        };
        const userToken = generateToken();

        const newUser = await prismaClient.user.create({
            data: {
                name: fullName,
                slug: generateSlug("fullName"),
                email,
                phone,
                role,
                plan,
                password: hashedPassword,
                token: userToken,
            },
        });
        
        //Send an Email with the Token on the link as a search param
        const token = newUser.token;
        const userId = newUser.id;
        const firstName = newUser.name.split(" ")[0];
        const linkText = "Verify your Account ";
        const message = "Thank you for registering with PriMed. To complete your registration and verify your email address, please enter the following 6-digit verification code on our website :";

        const resend = new Resend(process.env.RESEND_API_KEY)
        await resend.emails.send({
            from: "PriMed <info@pricorp.info>",
            to: email,
            subject: "Verify Your Email Address",
            react: EmailTemplate({ firstName, token, linkText, message }),
        });

        console.log(userId)
        return {
            data: newUser,
            error: null,
            status: 200,
        };

    } catch (error) {
        console.log("Error in createUser:", error, Date.now());        
        return {
            error: "Something went wrong"
        }
        
    }
}

export async function getUserById(id: string) {
    if (id) {
        try {
            const user = await prismaClient.user.findUnique({
                where: {
                    id,
                },
            });
            return user;
        } catch (error) {
            console.log(error);
            return null;
        }
    }
}

export async function updateUserbyId(id: string) {
    if (id) {
        try {
            const user = await prismaClient.user.update({
                where: {
                    id,
                },
                data: {
                    isVerfied: true,
                },
            });
            return user;
        } catch (error) {
            console.log(error);
            return null;
        }
    }
}

// export async function getDoctors(){
//     try {
//         const doctors = await prismaClient.user.findMany({
//             where: {
//                 role: "DOCTOR",
//             },
//             include: {
//                 doctorProfile: true,
//             },
//         })
//         return doctors;
//     } catch (error) {
//         console.log(error);
//         return null;
//     }
// }

export async function getDoctors(){
    try {
        const doctors = await prismaClient.user.findMany({
            where: {
                role: "DOCTOR",
            },
            select: {
                id: true,
                name: true,
                slug: true,
                email: true,
                phone: true,
                doctorProfile: {
                    select: {
                        id: true,
                        firstName: true,
                        lastName: true,
                        gender: true,
                        bio: true,
                        profilePicture: true,
                        operationMode: true,
                        hourlyWage: true,
                        availability: {
                            select: {
                                monday: true,
                                tuesday: true,
                                wednesday: true,
                                thursday: true,
                                friday: true,
                                saturday: true,
                                sunday: true,
                            },
                        }
                    }
                }
            }
                
        })
        return doctors;
    } catch (error) {
        console.log(error);
        return null;
    }
}

export async function getDoctorBySlug(slug: string) {
    if (slug) {
        try {
            const doctor = await prismaClient.user.findFirst({
                where: {
                    role: "DOCTOR",
                    slug
                },
                select: {
                    id: true,
                    name: true,
                    slug: true,
                    email: true,
                    phone: true,
                    doctorProfile: {
                        select: {
                            id: true,
                            firstName: true,
                            lastName: true,
                            gender: true,
                            bio: true,
                            profilePicture: true,
                            operationMode: true,
                            hourlyWage: true,
                            yearsOfExperience: true,
                            region: true,
                            city: true,
                            primarySpecialization: true,
                            otherSpecialties: true,
                            hospitalName: true,
                            hospitalAddress: true,
                            hospitalContactNumber: true, 
                            hospitalEmailAddress: true,
                            hospitalWebsite: true,
                            hospitalHoursOfOperation: true,
                            servicesOffered: true,
                            insuranceAccepted: true,
                            educationHistory: true,
                            research: true,
                            accomplishments: true,          
                            availability: {
                                select: {
                                    monday: true,
                                    tuesday: true,
                                    wednesday: true,
                                    thursday: true,
                                    friday: true,
                                    saturday: true,
                                    sunday: true,
                                },
                            }
                        }
                    }
                }
                    
            })
            if (!doctor) {
                return null;
            }
            return doctor;
        } catch (error) {
            console.log(error);
            return null;
        }
    }
}