import { DoctorProfileAvailabilty } from "../../types/types";

export const getDayName = (): keyof DoctorProfileAvailabilty => {
    const daysOfWeek: (keyof DoctorProfileAvailabilty)[] = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
    const today = new Date();
    const dayName = daysOfWeek[today.getDay()];
    return dayName;
}