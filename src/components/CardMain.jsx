import React from 'react';
import PropTypes from 'prop-types';

function CardMain({ index, img, title }) {
  return (
    <div data-testid={ `${index}-recipe-card` }>
      <img
        data-testid={ `${index}-card-img` }
        src={ img }
        alt="meals-or-drinks-img"
      />
      <h2 data-testid={ `${index}-card-name` }>{title}</h2>
    </div>
  );
}

CardMain.propTypes = {
  index: PropTypes.number.isRequired,
  img: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default CardMain;
