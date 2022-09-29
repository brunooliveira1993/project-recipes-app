import React from 'react';
import PropTypes from 'prop-types';
import './CardMain.css';

function CardMain({ index, img, title, isRecommendation }) {
  return (
    <div
      className="card-container"
      data-testid={ isRecommendation
        ? `${index}-recommendation-card`
        : `${index}-recipe-card` }
    >
      <div className="img-container">
        <img
          className="card-img"
          data-testid={ `${index}-card-img` }
          src={ img }
          alt="meals-or-drinks-img"
        />
      </div>
      <div className="name-container">
        <span
          className="card-name"
          data-testid={ isRecommendation
            ? `${index}-recommendation-title`
            : `${index}-card-name` }
        >
          {title}
        </span>
      </div>
    </div>
  );
}

CardMain.propTypes = {
  index: PropTypes.number.isRequired,
  img: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  isRecommendation: PropTypes.bool.isRequired,
};

export default CardMain;
