"use server"

import { prismaClient } from "@/lib/db";
import { RegisterInputProps } from "../types/types";
import bcrypt from "bcrypt";
import EmailTemplate from "@/components/Emails/email-template";
import {Resend} from "resend"

export async function createUser(formData: RegisterInputProps) {
    console.log("Starting createUser", Date.now());
    const { fullName, email, phone, role, password } = formData;
    try {
        console.log("Checking for existing user", Date.now());
        const existingUser = await prismaClient.user.findUnique({
            where: {
                email,
            },
        });
        if (existingUser) {
            console.log("User already exists", Date.now());
            return {
                data: null,
                error: `User with this email ( ${email})  already exists in the Database`,
                status: 409,
            };
        }

        console.log("Hashing password", Date.now());
        const hashedPassword = await bcrypt.hash(password, 10);
        //Generate Token
        const generateToken = () => {
            const min = 100000; // Minimum 6-figure number
            const max = 999999; // Maximum 6-figure number
            return Math.floor(Math.random() * (max - min + 1)) + min;
        };
        const userToken = generateToken();

        console.log("Creating new user", Date.now());
        const newUser = await prismaClient.user.create({
            data: {
                name: fullName,
                email,
                phone,
                role,
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

        console.log("Sending verification email", Date.now());
        const resend = new Resend(process.env.RESEND_API_KEY)
        await resend.emails.send({
            from: "PriMed <info@pricorp.info>",
            to: email,
            subject: "Verify Your Email Address",
            react: EmailTemplate({ firstName, token, linkText, message }),
        });

        console.log("User created successfully", Date.now());
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