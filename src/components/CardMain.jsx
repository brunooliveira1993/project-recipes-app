import React from 'react';

function CardProfile(props) {
  return (
    <div data-testid={`${props.index}-recipe-card`}>
      <img
        data-testid={`${props.index}-card-img`}
        src={props.img}
        alt='meals-or-drinks-img'
      />
      <h2 data-testid={`${props.index}-card-name`}>{props.tittle}</h2>
    </div>
  );
}

export default CardProfile;