import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import React from "react";

export type FAQItems = {
    qn: string;
    ans: string | React.ReactNode;
}

export default function CustomAccordion({ FAQS }: { FAQS: FAQItems[] }) {
    return (
        <Accordion type="single" collapsible className="w-full">
            {
                FAQS.map((faq, index) => {
                    return (
                        <AccordionItem value={faq.qn} key={index}>
                            <AccordionTrigger>{faq.qn}</AccordionTrigger>
                            <AccordionContent>
                                {faq.ans}.
                            </AccordionContent>
                        </AccordionItem>
                    )
                })
            }
        </Accordion>
    )
}
