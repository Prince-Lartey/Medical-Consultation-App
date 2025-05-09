import DoctorList from "@/components/DoctorList";
import { getDoctors } from "../../../../../../../actions/users";
import DoctorCard from "@/components/DoctorCard";

export default async function Home() {
    const doctors = (await getDoctors()) || []

    const telehealthDoctors = doctors.filter((doctor) => doctor.doctorProfile?.operationMode === "Telehealth Visit");
    const inPersonDoctors = doctors.filter((doctor) => doctor.doctorProfile?.operationMode === "In-Person Doctor Visit");

    return (
        <section className="">
            <h2>Select a Doctor to Continue</h2>
            {
                telehealthDoctors.length > 0 && (
                    <div className="py-4 grid place-items-center">
                        <h3 className="text-lg font-semibold py-3">Telehealth Doctors</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {telehealthDoctors.map((doctor) => {
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
                    <div className="py-4 grid place-items-center">
                        <h3 className="text-lg font-semibold py-3">In-Person Doctors</h3>
                        <div className="">
                            {inPersonDoctors.map((doctor) => {
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
