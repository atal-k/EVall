// Testimonial Card Component
import './TestimonialCard.css'

const TestimonialCard = ({ name, avatar, rating, text }) => {
    return (
      <div className="testimonial-card">
        <div className="testimonial-card__header">
          <img src={avatar} alt={name} className="testimonial-card__avatar" />
          <div className="testimonial-card__info">
            <h3 className="testimonial-card__name">{name}</h3>
            <div className="testimonial-card__rating">
              {[...Array(rating)].map((_, i) => (
                <span key={i}>⭐</span>
              ))}
            </div>
          </div>
        </div>
        <p className="testimonial-card__quote">{text}</p>
      </div>
    );
  };
  export default TestimonialCard;