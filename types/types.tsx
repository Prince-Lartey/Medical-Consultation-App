import { File } from "@/components/FormInputs/MultipleFileUpload";

export type ServiceProps = {
    title: string;
    imageUrl: string;
    slug: string;
}
export type RegisterInputProps = {
    fullName: string;
    email: string;
    password: string;
    phone: string;
    role: any;
    plan: any;
}
export type LoginInputProps = {
    email: string;
    password: string;
}
export type BioDataFormProps = {
    firstName: string;
    lastName: string;
    middleName: any;
    dob: any;
    gender: string;
    userId: string;
    page: string;
    trackingNumber: string
}
export type ProfileFormProps = {
    profilePicture: string;
    bio: string;
    medicalLicense: string;
    medicalLicenseExpiry: any;
    page: string;
    yearsOfExperience: number;
}
export type ContactFormProps = {
    region: string;
    city: string;
    phone: string;
    email: string;
    page: string;
}
export type EducationInfoProps = {
    medicalSchool: string;
    graduationYear: number;
    primarySpecialization: string;
    otherSpecialties: string[];
    boardCertificates: any;
    page: string;
}
export type PracticeFormProps = {
    hospitalName: string;
    hospitalAddress: string;
    hospitalContactNumber: string;
    hospitalEmailAddress: string;
    hospitalWebsite?: string;
    hospitalHoursOfOperation: number;
    servicesOffered: string[];
    insuranceAccepted: string;
    page: string;
}
export type AdditionalFormProps = {
    educationHistory: string;
    research: string;
    accomplishments: string;
    additionalDocs: any;
    page: string;
}
export type Stats = {
    doctors: string 
    patients: string
    appointments: string 
    services: string
}