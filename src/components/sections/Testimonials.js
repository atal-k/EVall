// Testimonials Section Component
import { useState, useEffect } from 'react';
import TestimonialCard from '../common/TestimonialCard';

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const testimonialsData = [
    {
      id: 1,
      name: 'Priya Patel',
      role: 'Head of Operations',
      company: 'Green Freight Services',
      avatar: 'images/person1.jpg',
      rating: 5,
      text: 'EVall Uday fits India\'s logistics challenges perfectly. Battery range and fast charging help us keep our schedules, while predictive maintenance reduces unscheduled breakdowns. This has got to be the smoothest way to manage a fleet.'
    },
    {
      id: 2,
      name: 'Rajesh Sharma',
      role: 'Fleet Manager',
      company: 'Delhi Logistics',
      avatar: 'images/person2.jpg',
      rating: 4,
      text: 'Making the switch to EVall Uday for our fleet has been a very big change. The vehicles are reliable and easy to work with, with their telematics helping me in route optimization and downtime reduction. Operating costwise, we now have revenues going down, so does the displeasure among the operators!'
    },
    {
      id: 3,
      name: 'Sanjay Verma',
      role: 'Senior Supervisor',
      company: 'Jagrit Express',
      avatar: 'images/person3.jpg',
      rating: 5,
      text: 'Real-time updates on driver performance and maintenance alerts are just a few features that EVall Uday brings to the table. It has made fleet management a breeze, and my team can indeed build consistent performances in even challenging city routes.'
    },
    {
      id: 4,
      name: 'Anil Kumar',
      role: 'Executive Owner',
      company: 'Bharat Cargo Movers',
      avatar: 'images/person4.jpg',
      rating: 4,
      text: 'I trust EVall Uday 100% for growing my business. The after-sales support is fabulous, the cost efficiency profitable, and basically, this heap puts together all the aspects of fleet management that improve customer sustainability through continued commitment.'
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % testimonialsData.length);
    }, 2000);

    return () => clearInterval(interval);
  }, [testimonialsData.length]);

  const getCardPosition = (index) => {
    const total = testimonialsData.length;
    const diff = (index - activeIndex + total) % total;
    
    if (diff === 0) return 'center';
    if (diff === 1 || diff === total - 2) return 'right';
    if (diff === total - 1 || diff === 2) return 'left';
    return 'hidden';
  };

  return (
    <section className="testimonials">
      <div className="container">
        <div className="testimonials__header">
          <h2 className="testimonials__title">Driving Miles With Happy Clients</h2>
          <p className="testimonials__subtitle">
            Hear from real EVall owners about their electric vehicle experience and how 
            switching to electric has transformed their daily driving.
          </p>
        </div>
        
        <div className="testimonials__carousel">
          <div className="testimonials__carousel-track">
            {testimonialsData.map((testimonial, index) => (
              <TestimonialCard
                key={testimonial.id}
                {...testimonial}
                position={getCardPosition(index)}
                isActive={index === activeIndex}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;