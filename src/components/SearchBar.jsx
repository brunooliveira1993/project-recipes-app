import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { FIRST_LETTER_BTN, FIRST_LETTER_VALUE, INGREDIENT_BTN, INGREDIENT_VALUE,
  NAME_BTN, NAME_VALUE, SEARCH_BTN } from '../constants';
import RecipesContext from '../context/RecipesContext';
import { handleSearchApiUrl, isMealsOrDrinks } from '../helpers';
import './SearchBar.css';

function SearchBar() {
  const {
    recipesData,
    getRecipesData,
  } = useContext(RecipesContext);
  const history = useHistory();
  const { pathname } = useLocation();
  const [searchInput, setSearchInput] = useState('');
  const [searchType, setSearchType] = useState(INGREDIENT_VALUE);
  const [verifySearchResult, setVerifySearchResult] = useState(false);

  // On update functions
  const isMeal = isMealsOrDrinks(pathname);

  // Validation functions
  const verifyInputBeforeSearchByFirstLetter = () => (searchInput.length > 1
    ? global.alert('Your search must have only 1 (one) character')
    : getRecipesData(handleSearchApiUrl(isMeal, searchType, searchInput)));

  const verifySearchResultAmount = () => {
    if (recipesData.length === 1) {
      const recipeId = Object.values(recipesData[0])[0];
      history.push(`${pathname}/${recipeId}`);
    }
    if (recipesData.length === 0) {
      global.alert('Sorry, we haven\'t found any recipes for these filters.');
      setVerifySearchResult(false);
    }
  };

  useEffect(() => {
    if (verifySearchResult) verifySearchResultAmount();
  }, [recipesData]);

  // Handling functions
  const handleSearchInput = ({ target: { value } }) => setSearchInput(value);

  const handleSearchRadioButton = ({ target: { value } }) => setSearchType(value);

  const handleSearchButtonClick = () => {
    if (searchType === FIRST_LETTER_VALUE) {
      return verifyInputBeforeSearchByFirstLetter();
    }
    getRecipesData(handleSearchApiUrl(isMeal, searchType, searchInput));
    setVerifySearchResult(true);
  };

  return (
    <div className="search-bar">
      <input
        className="input-search"
        data-testid="search-input"
        type="text"
        name="searchInput"
        value={ searchInput }
        onChange={ handleSearchInput }
      />
      <div className="radio-inputs">
        <input
          data-testid="ingredient-search-radio"
          type="radio"
          name="searchType"
          id="searchType"
          checked={ searchType === INGREDIENT_VALUE }
          value={ INGREDIENT_VALUE }
          onChange={ handleSearchRadioButton }
        />
        { INGREDIENT_BTN }
        <input
          data-testid="name-search-radio"
          type="radio"
          name="searchType"
          id="searchType"
          checked={ searchType === NAME_VALUE }
          value={ NAME_VALUE }
          onChange={ handleSearchRadioButton }
        />
        { NAME_BTN }
        <input
          data-testid="first-letter-search-radio"
          type="radio"
          name="searchType"
          id="searchType"
          checked={ searchType === FIRST_LETTER_VALUE }
          value={ FIRST_LETTER_VALUE }
          onChange={ handleSearchRadioButton }
        />
        { FIRST_LETTER_BTN }
      </div>
      <button
        className="btn-search"
        data-testid="exec-search-btn"
        type="button"
        onClick={ () => handleSearchButtonClick() }
      >
        { SEARCH_BTN }
      </button>
    </div>
  );
}

export default SearchBar;
