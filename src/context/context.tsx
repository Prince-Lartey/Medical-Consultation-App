"use client"

import { createContext, useContext, useState } from "react"
import { AdditionalFormProps, BioDataFormProps, ContactFormProps, EducationInfoProps, PracticeFormProps, ProfileFormProps } from "../../types/types";

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

    educationData: EducationInfoProps
    setEducationData: (value: EducationInfoProps) => void;

    practiceData: PracticeFormProps
    setPracticeData: (value: PracticeFormProps) => void;

    additionalData: AdditionalFormProps
    setAdditionalData: (value: AdditionalFormProps) => void;

    savedDBData: any
    setSavedDBData: (value: any) => void;
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

const initialEducationData = {
    medicalSchool: "",
    graduationYear: 0,
    primarySpecialization: "",
    otherSpecialties: [],
    boardCertificates: [],
    page: "",
}

const initialPracticeData = {
    hospitalName: "",
    hospitalAddress: "",
    hospitalContactNumber: "",
    hospitalEmailAddress: "",
    hospitalWebsite: "",
    hospitalHoursOfOperation: 0,
    servicesOffered: [],
    insuranceAccepted: "",
    page: "",
}

const initialAdditionalData = {
    educationHistory: "",
    research: "",
    accomplishments: "",
    additionalDocs: [],
    page: "",
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
    educationData: initialEducationData,
    setEducationData: () => {},
    practiceData: initialPracticeData,
    setPracticeData: () => {},
    additionalData: initialAdditionalData,
    setAdditionalData: () => {},
    savedDBData: {},
    setSavedDBData: () => {},
}

const OnBoardingContext = createContext<IOnBoardingContextData>(initialContextData)

export function OnBoardingContextProvider({ children }: { children: React.ReactNode }) {
    const [trackingNumber, setTrackingNumber] = useState<string>("")
    const [doctorProfileId, setDoctorProfileId] = useState<string>("")
    const [bioData, setBioData] = useState<BioDataFormProps>(initialBioData)
    const [profileData, setProfileData] = useState<ProfileFormProps>(initialProfileData)
    const [contactData, setContactData] = useState<ContactFormProps>(initialContactData)
    const [educationData, setEducationData] = useState<EducationInfoProps>(initialEducationData)
    const [practiceData, setPracticeData] = useState<PracticeFormProps>(initialPracticeData)
    const [additionalData, setAdditionalData] = useState<AdditionalFormProps>(initialAdditionalData)
    const [savedDBData, setSavedDBData] = useState<any>({})

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
        educationData,
        setEducationData,
        practiceData,
        setPracticeData,
        additionalData,
        setAdditionalData,
        savedDBData,
        setSavedDBData,
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