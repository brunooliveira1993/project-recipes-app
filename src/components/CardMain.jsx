import React from 'react';
import PropTypes from 'prop-types';

function CardMain({ index, img, title, isRecommendation }) {
  return (
    <div
      data-testid={ isRecommendation
        ? `${index}-recommendation-card`
        : `${index}-recipe-card` }
    >
      <img
        data-testid={ `${index}-card-img` }
        src={ img }
        alt="meals-or-drinks-img"
      />
      <h2
        data-testid={ isRecommendation
          ? `${index}-recommendation-title`
          : `${index}-card-name` }
      >
        {title}
      </h2>
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
