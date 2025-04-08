"use client"

import { createContext, useContext, useState } from "react"
import { BioDataFormProps, ContactFormProps, ProfileFormProps } from "../../types/types";

interface IOnBoardingContextData {
    trackingNumber: string;
    setTrackingNumber: (value: string) => void;
    doctorProfileId: string;
    setDoctorProfileId: (value: string) => void;

    bioData: BioDataFormProps
    setBioData: (value: BioDataFormProps) => void;

    profileData: ProfileFormProps
    setProfileData: (value: ProfileFormProps) => void;

    contactData: ContactFormProps
    setContactData: (value: ContactFormProps) => void;
}

const initialBioData = {
    firstName: "",
    lastName: "",
    middleName: "",
    dob: "",
    gender: "",
    userId: "",
    page: "",
    trackingNumber: ""
}

const initialProfileData = {
    profilePicture: "",
    bio: "",
    medicalLicense: "",
    medicalLicenseExpiry: "",
    page: "",
    yearsOfExperience: 0,
}

const initialContactData = {
    email: "",
    phone: "",
    page: "",
    region: "",
    city: ""
}

const initialContextData = {
    trackingNumber: "",
    setTrackingNumber: () => {},
    doctorProfileId: "",
    setDoctorProfileId: () => {},
    bioData: initialBioData,
    setBioData: () => {},
    profileData: initialProfileData,
    setProfileData: () => {},
    contactData: initialContactData,
    setContactData: () => {},
}

const OnBoardingContext = createContext<IOnBoardingContextData>(initialContextData)

export function OnBoardingContextProvider({ children }: { children: React.ReactNode }) {
    const [trackingNumber, setTrackingNumber] = useState("")
    const [doctorProfileId, setDoctorProfileId] = useState("")
    const [bioData, setBioData] = useState(initialBioData)
    const [profileData, setProfileData] = useState(initialProfileData)
    const [contactData, setContactData] = useState(initialContactData)

    const contextValues = {
        trackingNumber,
        setTrackingNumber,
        doctorProfileId,
        setDoctorProfileId,
        bioData,
        setBioData,
        profileData,
        setProfileData,
        contactData,
        setContactData,
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