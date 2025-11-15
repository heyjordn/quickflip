import React from 'react';

interface HomeCard {
  label: string;
  repository: string;
  imageUrl?: string;
}

interface HomeCardProps {
  card: HomeCard;
}

const HomeCardComponent: React.FC<HomeCardProps> = ({ card }) => {
  const defaultImage = "https://via.placeholder.com/150x100/3B82F6/FFFFFF?text=Study+Card";
  
  return (
    <div className="study-card">
      <div className="card-image-container">
        <img 
          src={card.imageUrl || defaultImage} 
          alt={card.label}
          className="card-image"
        />
      </div>
      <div className="card-content">
        <h3 className="card-title">{card.label}</h3>
        <a 
          href={card.repository} 
          target="_blank" 
          rel="noopener noreferrer"
          className="card-link"
        >
          View Repository
        </a>
      </div>
    </div>
  );
};

export default HomeCard;