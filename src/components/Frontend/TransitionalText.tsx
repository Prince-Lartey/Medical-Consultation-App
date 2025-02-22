"use client"

import React from 'react'
import TextTransition, { presets } from 'react-text-transition';

const TEXTS = ['Doctor', 'Therapist', 'Specialist ', 'Physician', 'Pediatrician', 'Dentist', 'Gynecologist', 'Surgeon', 'Cardiologist', 'Dermatologist', 'Psychiatrist', 'Neurologist', 'Orthopedic Surgeon', 'Radiologist', 'Oncologist', 'Anesthesiologist', 'Urologist', 'Urologist', 'Ophthalmologist'];

export default function TransitionalText() {
    const [index, setIndex] = React.useState(0);

    React.useEffect(() => {
        const intervalId = setInterval(() => setIndex((index) => index + 1),
            3000,
        );
        return () => clearTimeout(intervalId);
    }, []);
    
    return (
        <span className="text-cyan-300">
            <TextTransition springConfig={presets.wobbly}>{TEXTS[index % TEXTS.length]}</TextTransition>
        </span>
    );
}
