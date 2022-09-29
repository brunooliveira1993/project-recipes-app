import { React, useState } from 'react';
import '../images/shareIcon.svg';
import PropTypes from 'prop-types';
import { Link, useHistory } from 'react-router-dom';
import '../App.css';

const copy = require('clipboard-copy');

function CardProfile({ item, index }) {
  const [isCopy, setIsCopy] = useState(false);
  const history = useHistory();

  const copyToClipboard = (copyText) => {
    copy(copyText);
    setIsCopy(true);
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
        {
          item.tags.map((tag, index2) => (
            <tag
              data-testid={ `${index}-${tag}-horizontal-tag` }
              key={ index2 }
            >
              {tag}
            </tag>
          ))
        }
        {
          isCopy && <span>Link copied!</span>
        }
      </div>
    </div>
  );
}

CardProfile.propTypes = {
  item: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
};

export default CardProfile;
