"use client"

import { createContext, useContext, useState } from "react";

interface IOnBoardingContextData {
    trackingNumber: string;
    setTrackingNumber: (value: string) => void;
    doctorProfileId: string;
    setDoctorProfileId: (value: string) => void;
}

const initialValues = {
    trackingNumber: "",
    setTrackingNumber: () => {},
    doctorProfileId: "",
    setDoctorProfileId: () => {},
}

const OnBoardingContext = createContext<IOnBoardingContextData>(initialValues)

export function OnBoardingContextProvider({ children }: { children: React.ReactNode }) {
    const [trackingNumber, setTrackingNumber] = useState("")
    const [doctorProfileId, setDoctorProfileId] = useState("")

    const contextValues = {
        trackingNumber,
        setTrackingNumber,
        doctorProfileId,
        setDoctorProfileId,
    }

    return (
        <OnBoardingContext.Provider value={contextValues}>
            {children}
        </OnBoardingContext.Provider>
    )
}

export function useOnboardingContext(){
    return useContext(OnBoardingContext)
}

export default OnBoardingContext