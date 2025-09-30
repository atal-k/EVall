// Testimonials Section Component
import TestimonialCard from "../common/TestimonialCard";

const Testimonials = () => {
  const testimonialsData = [
    {
      id: 1,
      name: "Lalita Thakur",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&h=120&fit=crop",
      rating: 5,
      text: "Switching to EVall has been the best decision I've ever made. The car is incredibly smooth and silent, and the savings on fuel are remarkable."
    },
    {
      id: 2,
      name: "Vikas Tiwari",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&h=120&fit=crop",
      rating: 5,
      text: "As a busy mom, I feel confident driving the EVall Trucks, thanks to its impressive safety features and reliable performance. The extensive charging network is an added bonus."
    },
    {
      id: 3,
      name: "Ramesh Gupta",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&h=120&fit=crop",
      rating: 5,
      text: "The perfect city EV! Its compact size makes parking a breeze, and the instant electric acceleration makes navigating city traffic effortless. With government subsidies, it's also incredibly affordable."
    }
  ];
    return (
      <section className="testimonials">
        <div className="container">
          <div className="testimonials__header">
            <h2 className="testimonials__title">What our customers say</h2>
            <p className="testimonials__subtitle">
              Hear from real EVall owners about their electric vehicle experience and how 
              switching to electric has transformed their daily driving.
            </p>
          </div>
          
          <div className="testimonials__grid">
            {testimonialsData.map(testimonial => (
              <TestimonialCard key={testimonial.id} {...testimonial} />
            ))}
          </div>
        </div>
      </section>
    );
  };
export default Testimonials;