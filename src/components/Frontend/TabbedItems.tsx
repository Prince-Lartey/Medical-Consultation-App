"use client"

import { useState } from "react";
import { Tabs } from "flowbite-react";
import { HiUserCircle, HiClipboardList, HiHeart, HiLightBulb } from "react-icons/hi"
import ServiceList from "./Services/ServiceList";
import LinkCards from "./Doctors/LinkCards";

export default function TabbedItems() {
  const [activeTab, setActiveTab] = useState(0)

  const services = [
    {
      title: "Telehealth",
      image: "/doctor.jpg",
      slug: "telehealth",
    },
    {
      title: "Video prescription refill",
      image: "/doctor.jpg",
      slug: "telehealth",
    },
    {
      title: "UTI consult",
      image: "/doctor.jpg",
      slug: "telehealth",
    },
    {
      title: "Mental health consult",
      image: "/doctor.jpg",
      slug: "telehealth",
    },
    {
      title: "In preson doctor visit",
      image: "/doctor.jpg",
      slug: "telehealth",
    },
    {
      title: "ED consult",
      image: "/doctor.jpg",
      slug: "telehealth",
    }, 

  ]

  const tabs = [
    {
      title: "Popular Services",
      icon: HiUserCircle,
      component: <ServiceList data={services}/>,
      content: [],
    },
    {
      title: "Doctors",
      icon: HiClipboardList,
      component: <LinkCards />,
      content: [],
    },
    {
      title: "Specialists",
      icon: HiHeart,
      component: <LinkCards className="bg-blue-950"/>,
      content: [],
    },
    {
      title: "Symptoms",
      icon: HiLightBulb,
      component: <LinkCards className="bg-purple-900"/>,
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
