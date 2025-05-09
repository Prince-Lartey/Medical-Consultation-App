import * as React from "react";
import {
    Body,
    Button,
    Container,
    Head,
    Html,
    Img,
    Preview,
    Section,
    Text,
} from "@react-email/components";
interface NewAppointmentEmailProps {
    firstName?: string;
    link: string;
    message: string;
}

export const NewAppointmentEmail = ({
    firstName = "",
    link,
    message,
}: NewAppointmentEmailProps) => (
    <Html>
        <Head />
            <Preview>New Appointment</Preview>
            <Body style={main}>
                <Container style={container}>
                <Img
                    src="https://e1buy3qdez.ufs.sh/f/J6dncW3AVEReHxGLHn4476xTYy2EX5CqNsiMeW1vtRfkoGPp"
                    width="32"
                    height="32"
                    alt="Claridy"
                />
    
                <Section style={section}>
                    <Text style={text}>
                        Dear Dr.<strong>{firstName}</strong>!
                    </Text>
                    <Text style={text}>{message}</Text>
            
                    <Button href={link} style={button}>
                        View Appointment
                    </Button>
                    <Text style={text}>
                        If you have any questions, feel free to reach out.
                    </Text>
                </Section>
            </Container>
        </Body>
    </Html>   
);

export default NewAppointmentEmail;

const main = {
    backgroundColor: "#ffffff",
    color: "#24292e",
    fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji"',
};

const container = {
    width: "480px",
    margin: "0 auto",
    padding: "20px 0 48px",
};

const section = {
    padding: "24px",
    border: "solid 1px #dedede",
    borderRadius: "5px",
    textAlign: "center" as const,
};

const text = {
    margin: "0 0 10px 0",
    textAlign: "left" as const,
};

const button = {
    fontSize: "24px",
    backgroundColor: "#28a745",
    color: "#fff",
    lineHeight: 1.5,
    borderRadius: "0.5em",
    padding: "0.75em 1.5em",
};