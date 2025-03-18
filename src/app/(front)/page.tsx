import DoctorList from "@/components/DoctorList";
import Brands from "@/components/Frontend/Brands";
import Hero from "@/components/Frontend/Hero";
import TabbedSection from "@/components/Frontend/TabbedSection";

export default function Home() {
  return (
    <section className="">
      <Hero />
      <Brands />
      <TabbedSection />
      <DoctorList />
      <DoctorList title="In-Person Doctor Visit" isInPerson={true} className="bg-gray-200 dark:bg-slate-950 py-8 lg:py-24"/>
    </section>
  );
}
