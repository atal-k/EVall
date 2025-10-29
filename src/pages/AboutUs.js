// ============================================
// src/pages/AboutUs.js
// ============================================

import React from 'react';
import Callout from '../components/sections/Callout';
import HeaderBanner from '../components/layout/HeaderBanner';
import AlternateLayout from '../components/common/AlternateLayout';
import TabView from '../components/common/TabView';
import LeadershipSection from '../components/sections/LeadershipSection';
import GreenSolutionBanner from '../components/layout/GreenSolutionBanner';
const AboutUs = () => {
    const aboutData = [
      {
        id: 1,
        title: "Who We Are",
        description: "EVall Mobility is a dynamic force in India's electric commercial vehicle sector, pioneering sustainable transportation solutions backed by decades of automotive manufacturing expertise. Established in 2023, we blend innovation with reliability to drive India's green mobility future.",
        image: "/images/about-us/who-we-are.webp"
      },
      {
        id: 2,
        title: "Our Road to Success, Innovation & Redefining Mobility",
        description: "Rooted in 40+ years of automotive excellence, EVall Mobility has strategically entered the EV market to reshape logistics and transport with cutting-edge electric vehicles designed to meet evolving fleet needs. Our journey is marked by continuous innovation and customer-centric design.",
        image: "/images/about-us/road-to-success.webp"
      },
      {
        id: 3,
        title: "Our Legacy",
        description: "Born from a rich heritage of automotive component manufacturing, EVall leverages deep industry relationships and manufacturing prowess to craft vehicles that are not just eco-friendly but performance-driven and scalable.",
        image: "/images/about-us/legacy.webp"
      }
    ];
    const tabViewData = [
        {
          id: 1,
          tabName: "What Drives Us",
          title: "What Drives Us",
          img: {
            src: "/images/tab-view/what-drives-us.webp",
            alt: "person looking over mountains (illustrative)"
          },
          paragraphs: [
            "At EVall Mobility, we design, engineer, and manufacture next-generation electric commercial vehicles crafted specifically for India’s diverse logistics landscape. From the bustling streets of urban e-commerce deliveries to the rugged routes of rural freight movement, our vehicles are engineered to be:"
          ],
          bullets: [
            {
              title: "Reliable",
              text: "Built for maximum uptime and long service life, ensuring your operations never miss a beat."
            },
            {
              title: "Efficient",
              text: "Delivering higher productivity and meaningful cost savings to businesses across sectors."
            },
            {
              title: "Sustainable",
              text: "Embodying our commitment to driving India closer to a greener tomorrow."
            }
          ]
        },
      
        {
          id: 2,
          tabName: "Vision",
          title: "Vision Statement",
          img: {
            src: "/images/tab-view/vision.webp",
            alt: "vision illustration"
          },
          paragraphs: [
            "Our vision stays strong to redefine commercial mobility through sustainable innovation, inclusive leadership, and ecosystem integrity—driving a future where every journey respects the planet and uplifts the people behind it."
          ],
          bullets: []
        },
      
        {
          id: 3,
          tabName: "Mission",
          title: "Mission Statement",
          img: {
            src: "/images/tab-view/mission.webp",
            alt: "mission illustration"
          },
          paragraphs: [
            "EVall Mobility exists to:"
          ],
          bullets: [
            "Design and deliver reliable, energy-efficient electric vehicles tailored for commercial excellence. Our Aim is to build a paperless operations Company.",
            "Champion circular economy practices through ethical sourcing, battery lifecycle management, and responsible recycling.",
            "Foster a culture of dignity, skill-based recognition, and continuous improvement across every team and partner.",
            "Collaborate with government, industry, and communities to shape policies that support sustainable growth and innovation.",
            "Simplify operations through visual clarity, actionable insights, and transparent communication—from factory floor to boardroom."
          ]
        },
      
        {
          id: 4,
          tabName: "Values",
          title: "Our Core Values",
          img: {
            src: "/images/tab-view/values.webp",
            alt: "values illustration"
          },
          paragraphs: [],
          bullets: [
            {
              title: "Integrity",
              text: "We uphold honesty and transparency in every decision, earning trust with ethical practices across all operations."
            },
            {
              title: "Innovation",
              text: "We drive progress by continuously developing smart solutions and adopting leading-edge technologies in mobility."
            },
            {
              title: "Customer Focus",
              text: "Our commitment centers on understanding and exceeding customer needs with tailored, high-value experiences and reliable products."
            },
            {
              title: "Sustainability",
              text: "Every solution and process is designed with responsibility for our planet and future generations at the forefront."
            },
            {
              title: "Collaboration",
              text: "We actively build partnerships with stakeholders, customers, and communities to create impactful, long-lasting mobility solutions."
            }
          ]
        }
      ];

    const leadershipData = {
        heading: "The Visionaries",
        subtitle:
          "Led by a team with extensive expertise in vehicle engineering, battery technology, and automotive manufacturing, our leadership drives innovation with a commitment to quality and green progress.",
        persons: [
          {
            name: "Mr. Naresh Kansal",
            position: "Director",
            about:
              "A seasoned entrepreneur shaping EVall Mobility’s strategic path with a legacy of innovation and sustainable growth in engineering and mobility sectors.",
            img: {
              src: "/images/leadership/person1.webp",
              alt: "Mr. Naresh Kansal - Director",
            },
            links: {
              linkedin: "#",
              facebook: "#",
              x: "#",
              youtube: "#",
            },
          },
          {
            name: "Mr. Sunny Kansal",
            position: "Director",
            about:
              "Guiding strategic planning and business operations, Sunny drives sustainable innovation and robust corporate governance at EVall Mobility.",
            img: {
              src: "/images/leadership/person2.webp",
              alt: "Mr. Sunny Kansal - Director",
            },
            links: {
              linkedin: "#",
              facebook: "#",
              x: "#",
              youtube: "#",
            },
          },
          {
            name: "Mr. Ajit Kumar",
            position: "Vice President",
            about:
              "Strategic Sourcing & Operations — Expertly leading supply chain, vendor partnerships, and operational excellence to optimize costs and power EVall’s growing electric vehicle portfolio.",
            img: {
              src: "/images/leadership/person3.webp",
              alt: "Mr. Ajit Kumar - Vice President",
            },
            links: {
              linkedin: "#",
              facebook: "#",
              x: "#",
              youtube: "#",
            },
          },
          {
            name: "Mr. Manohar Lal",
            position: "Head – R&D, Electric Vehicles",
            about:
              "Spearheading next-gen product innovation with deep expertise in powertrain technology and EV system integration, paving the way for cutting-edge commercial vehicles.",
            img: {
              src: "/images/leadership/person4.webp",
              alt: "Mr. Manohar Lal - Head – R&D, Electric Vehicles",
            },
            links: {
              linkedin: "#",
              facebook: "#",
              x: "#",
              youtube: "#",
            },
          },
        ],
      };
      
  
    return (
      <div className="about-us-page">
        <HeaderBanner 
          heading="About Us"
          subtitle="The shift to electric mobility is inevitable, and essential."
        />
        <AlternateLayout data={aboutData} />
        <TabView data={tabViewData}/>
        <LeadershipSection data={leadershipData}/>
        <GreenSolutionBanner/>
        <Callout/>
      </div>
    );
  };
export default AboutUs;

