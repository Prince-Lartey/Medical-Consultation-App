"use client"

import { useState } from "react";
import { Tabs } from "flowbite-react";
import { HiUserCircle, HiHeart, HiLightBulb } from "react-icons/hi"
import ServiceList from "./Services/ServiceList";
import LinkCards from "./Doctors/LinkCards";
import { Service, Specialty, Symptom } from "@prisma/client";
import SymptomCards from "./Doctors/SymptomCards";

export default function TabbedItems({services, specialties, symptoms}: {services: Service[], specialties: Specialty[], symptoms: Symptom[]}) {
  const [activeTab, setActiveTab] = useState(0)


  const tabs = [
    {
      title: "Popular Services",
      icon: HiUserCircle,
      component: <ServiceList data={services}/>,
      content: [],
    },
    {
      title: "Specialists",
      icon: HiHeart,
      component: <LinkCards className="bg-blue-950" specialties={specialties}/>,
      content: [],
    },
    {
      title: "Symptoms",
      icon: HiLightBulb,
      component: <SymptomCards className="bg-purple-900" symptoms={symptoms}/>,
      content: [],
    },
  ]

  return (
    <Tabs aria-label="Tabs with underline" variant="underline" onActiveTabChange={(index) => setActiveTab(index)}>
      {
        tabs.map((tab, index) => (
          <Tabs.Item key={index} title={tab.title} icon={tab.icon} active={activeTab === index}>
            {tab.component}
          </Tabs.Item>
      ))}
    </Tabs>
  );
}
