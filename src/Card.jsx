import { useEffect, useRef, useState } from "react";
import "./Card.css";

function Card({ image, title, date, Venue, mode, participants, fee, prize, description, info, index, Time, org }) {
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
      className={`card ${isVisible ? "card-visible" : ""}`}
      style={{
        animationDelay: `${index * 0.05}s`
      }}
    >
      {image && <img src={image} alt={title} />}
      <div className="card-content">
        {title && <h2>{title}</h2>}
        {date && <p><strong>Date Conducted :</strong> {date}</p>}
        {participants && <p><strong>No of Participants :</strong> {participants}</p>}
        {Venue && <p><strong>Venue :</strong> {Venue}</p>}
        {mode && <p><strong>Mode :</strong> {mode}</p>}
        {fee && <p><strong>Registration Fee :</strong> {fee}</p>}
        {prize && <p><strong>Prizes Worth :</strong> {prize}</p>}
        {Time && <p><strong>Time :</strong> {Time}</p>}
        {org && <p><strong>Organized By :</strong> {org}</p>}
        {description && <p><strong>{description}</strong></p>}
        {info && <p>{info}</p>}
      </div>
    </div>
  );
}

export default Card;
