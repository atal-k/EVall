// Button Component
import './Button.css'

const Button = ({ children, variant = 'primary', size = 'medium', onClick, className = '' }) => {
    const classes = `btn btn--${variant} ${size === 'small' ? 'btn--small' : ''} ${className}`;
    return (
      <button className={classes} onClick={onClick}>
        {children}
      </button>
    );
  };

export default Button;