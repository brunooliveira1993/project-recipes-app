import { React, useState } from 'react';
import '../images/shareIcon.svg';
import '../images/blackHeartIcon.svg';
import PropTypes from 'prop-types';
import { Link, useHistory } from 'react-router-dom';
import '../App.css';

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
    <div>
      <div key={ index }>
        <input
          className="teste"
          onClick={ clickRedirect }
          type="image"
          src={ item.image }
          alt="food"
          data-testid={ `${index}-horizontal-image` }
        />
        <Link key={ index } to={ `/${item.type}s/${item.id}` }>
          <span data-testid={ `${index}-horizontal-name` }>{ item.name }</span>
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
        <button
          type="button"
          onClick={ () => copyToClipboard(`http://localhost:3000/${item.type}s/${item.id}`) }
        >
          <img
            src="../images/shareIcon.svg"
            alt="share"
            data-testid={ `${index}-horizontal-share-btn` }
          />
        </button>
        <button type="button" onClick={ () => removeFavoriteItem(index) }>
          <img
            src="../images/blackHeartIcon.svg"
            alt="share"
            data-testid={ `${index}-horizontal-favorite-btn` }
          />
        </button>
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
