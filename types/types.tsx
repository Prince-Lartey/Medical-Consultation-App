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
    hourlyWage: number
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

export type DoctorProfileAvailabilty = {
    monday: string[];
    tuesday: string[];
    wednesday: string[];
    thursday: string[];
    friday: string[];
    saturday: string[];
    sunday: string[];
}

export interface DoctorProfile {
    firstName: string;
    lastName: string;
    gender: string;
    bio: string | null;
    profilePicture: string | null;
    operationMode: string | null;
    availability: DoctorProfileAvailabilty | null;
    hourlyWage: number
}

interface DoctorProfileDetail extends DoctorProfile {
    yearsOfExperience: number | null;
    region: string | null;
    city: string | null;
    primarySpecialization: string | null;
    otherSpecialties: string[] | null;
    hospitalName: string | null;
    hospitalAddress: string | null;
    hospitalContactNumber: string | null;
    hospitalEmailAddress: string | null; 
    hospitalWebsite: string | null;
    hospitalHoursOfOperation: number | null;
    servicesOffered: string[] | null;
    insuranceAccepted: string | null;
    educationHistory: string | null;
    research: string | null;
    accomplishments: string | null;
}

export type Doctor = {
    id: string;
    name: string;
    slug: string;
    email: string;
    phone: string;
    doctorProfile: DoctorProfile | null;
}

export type DoctorDetail = {
    id: string;
    name: string;
    slug: string;
    email: string;
    phone: string;
    doctorProfile: DoctorProfileDetail | null;
}

export interface AppointmentProps {
    appointmentDate: string;
    appointmentYear: string;
    appointmentMonth: string;
    doctorId: string;
    charge: string;
    appointmentTime: string;

    // Patient details
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    dob: string;
    gender: string;
    location: string;
    appointmentReason: string;
    medicalDocument: string[];
    occupation: string;
}