import { React, useState } from 'react';
import PropTypes from 'prop-types';
import { Link, useHistory } from 'react-router-dom';
import share from '../images/shareIcon.svg';
import favorite from '../images/blackHeartIcon.svg';
import './CardFavorite.css';

const copy = require('clipboard-copy');

function CardFavorite({ item, index, renderPage }) {
  const [isCopy, setIsCopy] = useState(false);
  const history = useHistory();

  const localStorageItem = JSON.parse(localStorage.getItem('favoriteRecipes'));

  const copyToClipboard = (copyText) => {
    copy(copyText);
    setIsCopy(true);
  };

  const removeFavoriteItem = (indexToRemove) => {
    renderPage(false);
    const updateFavorite = localStorageItem.filter((_, indexFromLocalStorage) => (
      indexFromLocalStorage !== indexToRemove));
    localStorage.setItem('favoriteRecipes', JSON.stringify(updateFavorite));
  };

  const clickRedirect = () => history.push(`/${item.type}s/${item.id}`);

  return (
    <div className="fav-card" key={ index }>
      <div className="img-fav-container">
        <input
          className="img-fav"
          onClick={ clickRedirect }
          type="image"
          src={ item.image }
          alt="food"
          data-testid={ `${index}-horizontal-image` }
        />
      </div>
      <div className="info-fav-container">
        <Link className="info-fav" key={ index } to={ `/${item.type}s/${item.id}` }>
          <h3 data-testid={ `${index}-horizontal-name` }>{ item.name }</h3>
          <span
            data-testid={ `${index}-horizontal-done-date` }
          >
            { item.doneDate }
          </span>
          {
            item.alcoholicOrNot === 'Alcoholic'
              ? (
                <span data-testid={ `${index}-horizontal-top-text` }>
                  {`${item.alcoholicOrNot}`}
                </span>
              )
              : (
                <span data-testid={ `${index}-horizontal-top-text` }>
                  {`${item.nationality} - ${item.category}`}
                </span>
              )
          }
        </Link>
        <div className="btn-fav-container">
          <input
            data-testid={ `${index}-horizontal-share-btn` }
            type="image"
            src={ share }
            alt="share button"
            onClick={ () => copyToClipboard(`http://localhost:3000/${item.type}s/${item.id}`) }
          />
          <input
            data-testid={ `${index}-horizontal-favorite-btn` }
            type="image"
            src={ favorite }
            alt="favorite button"
            onClick={ () => removeFavoriteItem(index) }
          />
        </div>
        {
          isCopy && <span>Link copied!</span>
        }
      </div>
    </div>
  );
}

CardFavorite.propTypes = {
  item: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  renderPage: PropTypes.func.isRequired,
};

export default CardFavorite;
