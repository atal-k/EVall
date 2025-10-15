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
                <span key={i} className="testimonial-card__star">⭐</span>
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