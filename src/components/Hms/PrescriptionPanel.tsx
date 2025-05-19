"use client"

import React, { useState } from 'react'
import { Check, Pill } from 'lucide-react'

interface Medication {
    name: string;
    dosage: string;
    instructions: string;
}

interface PrescriptionPanelProps {
    roomId: string;
    isDoctor: boolean;
}

export default function PrescriptionPanel({ isDoctor }: PrescriptionPanelProps) {
    const [medications, setMedications] = useState<Medication[]>([
        { name: "Nivalidol", dosage: "500 MG • TABLET", instructions: "" },
        { name: "Locarip", dosage: "5 ML • DROPS", instructions: "" },
        { name: "Amoricillin", dosage: "400 MG • CAPSULE", instructions: "" }
    ]);

    setMedications([])

    return (
        <div className="prescription-panel">
            <div className="prescription-header">
                <h2>PRESCRIPTION</h2>
                {isDoctor && (
                    <button className="info-button">
                        <span>i</span>
                    </button>
                )}
            </div>

            <div className="medications-list">
                {medications.map((med, index) => (
                    <div key={index} className="medication-item">
                        <div className="medication-icon">
                            <Check size={16} />
                        </div>
                        <div className="medication-details">
                            <div className="medication-name">{med.name}</div>
                            <div className="medication-dosage">{med.dosage}</div>
                        </div>
                    </div>
                ))}
            </div>

            {isDoctor && (
                <button className="add-medication-button">
                    <Pill size={16} />
                    <span>Add Medication</span>
                </button>
            )}
        </div>
    )
}