"use server"

import { MailProps } from "@/components/Dashboard/ComposeMailForm";
import { Resend } from "resend";

export async function sendEmail(mailData: MailProps) {
    const { to, subject, html, attachments } = mailData;
    try {        

        const resend = new Resend(process.env.RESEND_API_KEY)
        const sendMail = await resend.emails.send({
            from: "PriMed <info@pricorp.info>",
            to: to,
            subject: subject,
            html: html,
            attachments: attachments.map((file) => ({
                filename: file.title,
                path: file.url
            })),
        });

        console.log(sendMail)
        return {
            data: sendMail,
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