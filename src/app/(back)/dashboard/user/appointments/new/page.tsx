import { getDoctors } from "../../../../../../../actions/users";
import DoctorCard from "@/components/DoctorCard";
import { Doctor } from "../../../../../../../types/types";

export default async function Home() {
    const doctors = (await getDoctors()) || []

    const telehealthDoctors = doctors.filter((doctor: Doctor) => doctor.doctorProfile?.operationMode === "Telehealth Visit");
    const inPersonDoctors = doctors.filter((doctor: Doctor) => doctor.doctorProfile?.operationMode === "In-Person Doctor Visit");

    return (
        <section className="">
            {
                telehealthDoctors.length > 0 && (
                    <div className="py-4">
                        <h3 className="px-4 border-b font-semibold py-3 text-xl lg:text-3xl mb-3">Telehealth Doctors</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 place-items-center">
                            {telehealthDoctors.map((doctor: Doctor) => {
                                return (
                                    <DoctorCard key={doctor.id} doctor={doctor} isInPerson={false} />
                                )
                            })}
                        </div>
                    </div>
                )
            }

            {
                inPersonDoctors.length > 0 && (
                    <div className="py-4">
                        <h3 className="px-4 border-b font-semibold py-3 text-xl lg:text-3xl mb-3">In-Person Doctors</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 place-items-center">
                            {inPersonDoctors.map((doctor: Doctor) => {
                                return (
                                <DoctorCard key={doctor.id} doctor={doctor} isInPerson={true} />
                            )})}
                        </div>
                    </div>
                )
            }
        </section>
    );
}
