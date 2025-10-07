import { useEffect, useRef, useState } from "react";
import "./Card_button.css";

function Card({ image, title, date, theme, info, websiteLink, brochureLink, index }) {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        threshold: 0.15
      }
    );

    const currentCard = cardRef.current;
    if (currentCard) {
      observer.observe(currentCard);
    }

    return () => {
      if (currentCard) {
        observer.unobserve(currentCard);
      }
    };
  }, []);

  return (
    <div
      ref={cardRef}
      className={`card ${isVisible ? 'card-visible' : ''}`}
      style={{
        animationDelay: `${index * 0.05}s`
      }}
    >
      <img src={image} alt={title} className="card-image" />
      <div className="card-content">
        <h2 className="card-title">{title}</h2>
        <p className="card-date">
          <strong>Date Conducted : </strong>
          <span className="date-value">{date}</span>
        </p>
        <p className="card-theme">
          <strong>Theme of Prakalpa : </strong>
          <span className="theme-value">{theme}</span>
        </p>
        
        {info && <p className="card-info">{info}</p>}
        
        <div className="card-buttons">
          {websiteLink && (
            <button 
              className="btn-website"
              onClick={() => window.open(websiteLink, '_blank')}
            >
              VISIT WEBSITE
            </button>
          )}
          {brochureLink && (
            <button 
              className="btn-brochure"
              onClick={() => window.open(brochureLink, '_blank')}
            >
              BROCHURE
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Card;