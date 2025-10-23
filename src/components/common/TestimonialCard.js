// Testimonial Card Component
import './TestimonialCard.css';

const TestimonialCard = ({ name, role, company, avatar, rating, text, position, isActive }) => {
  return (
    <div className={`testimonial-card testimonial-card--${position} ${isActive ? 'testimonial-card--active' : ''}`}>
      <div className="testimonial-card__content">
        <div className="testimonial-card__header">
          <img src={avatar} alt={name} className="testimonial-card__avatar" />
          <div className="testimonial-card__info">
            <h3 className="testimonial-card__name">{name}</h3>
            <p className="testimonial-card__role">{role}, {company}</p>
            <div className="testimonial-card__rating">
              {[...Array(rating)].map((_, i) => (
                <span key={i} className="testimonial-card__star"><svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 24 24">
                <path fill="currentColor" d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2L9.19 8.63L2 9.24l5.46 4.73L5.82 21z" />
              </svg></span>
              ))}
            </div>
          </div>
        </div>
        <div className="testimonial-card__quote-wrapper">
          <span className="testimonial-card__quote-icon">"</span>
          <p className="testimonial-card__quote">{text}</p>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;