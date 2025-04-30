import DoctorList from "@/components/DoctorList";
import Brands from "@/components/Frontend/Brands";
import Hero from "@/components/Frontend/Hero";
import TabbedSection from "@/components/Frontend/TabbedSection";
import { getDoctors } from "../../../actions/users";

export default async function Home() {
  const doctors = (await getDoctors()) || []

  const telehealthDoctors = doctors.filter((doctor) => doctor.doctorProfile?.operationMode === "Telehealth Visit");
  const inPersonDoctors = doctors.filter((doctor) => doctor.doctorProfile?.operationMode === "In-Person Doctor Visit");

  return (
    <section className="">
      <Hero />
      <Brands />
      <TabbedSection />
      <DoctorList doctors={telehealthDoctors}/>
      <DoctorList title="In-Person Doctor Visit" isInPerson={true} className="bg-gray-200 dark:bg-slate-950 py-8 lg:py-24" doctors={inPersonDoctors}/>
    </section>
  );
}
