import * as React from "react";
import {
    Body,
    Button,
    Container,
    Head,
    Html,
    Img,
    Link,
    Preview,
    Section,
    Text,
} from "@react-email/components";
interface EmailTemplateProps {
    firstName?: string;
    token: number;
    linkText: string;
    message: string;
}

export const EmailTemplate = ({
    firstName = "",
    token,
    linkText,
    message,
}: EmailTemplateProps) => (
    <Html>
        <Head />
            <Preview>{linkText}</Preview>
            <Body style={main}>
                <Container style={container}>
                <Img
                    src="https://e1buy3qdez.ufs.sh/f/J6dncW3AVEReHxGLHn4476xTYy2EX5CqNsiMeW1vtRfkoGPp"
                    width="32"
                    height="32"
                    alt="Claridy"
                />
    
                <Text style={title}>
                    <strong>@{firstName}</strong>, Thank You for Joining Us
                </Text>
    
                <Section style={section}>
                    <Text style={text}>
                        Hey <strong>{firstName}</strong>!
                    </Text>
                    <Text style={text}>{message}</Text>
            
                    <Button style={button}>{token}</Button>
                    <Text style={text}>
                        If you have any questions, feel free to reach out.
                    </Text>
                </Section>
                <Text style={links}>
                    <Link style={link}>Your security audit log</Link> ・{" "}
                    <Link style={link}>Contact support</Link>
                </Text>

                <Text style={footer}>
                PriMed, Inc. ・Kofi Atta Annan Street ・Accra, Ghana
                </Text>
            </Container>
        </Body>
    </Html>   
);

export default EmailTemplate;

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

const title = {
    fontSize: "24px",
    lineHeight: 1.25,
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

const links = {
    textAlign: "center" as const,
};

const link = {
    color: "#0366d6",
    fontSize: "12px",
};

const footer = {
    color: "#6a737d",
    fontSize: "12px",
    textAlign: "center" as const,
    marginTop: "60px",
};