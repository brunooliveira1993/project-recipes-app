import React, { useEffect, useState } from 'react';
import { Link, useHistory, useLocation, useParams } from 'react-router-dom';
import { handleRecipeDetailsApiUrl, handleRemoveFavorite,
  handleSaveFavorite, isRecipeDone, isRecipeInProgress,
  isMealsOrDrinks, handleSaveOrRemoveInProgress,
  getRecipeProgress } from '../helpers';
import { fetchRecipes, getFavoriteFromLocalStorage,
  handleFavoritesLocalStorage, handleInProgressLocalStorage } from '../services';
import { DRINKS_PATH, IN_PROGRESS_PATH, MEALS_PATH } from '../constants';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';

const copy = require('clipboard-copy');

function RecipeInProgress() {
  const { id } = useParams();
  const { pathname } = useLocation();
  const history = useHistory();
  const [recipeDetails, setRecipeDetails] = useState({});
  const [isCopied, setIsCopied] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [usedIngredients, setUsedIngredients] = useState([]);

  // On mount Functions
  const isMeal = isMealsOrDrinks(pathname);
  const isInProgress = isRecipeInProgress(isMeal, id);
  const isDone = isRecipeDone(id);

  const isCurrentRecipeFavorite = () => {
    const currentFavoriteRecipes = getFavoriteFromLocalStorage() || [];
    const isCurrentRecipeIdAlreadySaved = currentFavoriteRecipes
      .some(({ id: favoriteId }) => favoriteId === id);
    setIsFavorite(isCurrentRecipeIdAlreadySaved);
  };

  const continueFromSavedProgress = () => {
    const currentRecipeInProgress = getRecipeProgress(isMeal, id);
    setUsedIngredients(currentRecipeInProgress);
  };

  useEffect(() => {
    const fetchRecipeDetails = async () => {
      const data = await fetchRecipes(handleRecipeDetailsApiUrl(isMeal, id));
      const newRecipeDetails = Object.values(data)[0][0];
      setRecipeDetails(newRecipeDetails);
      isCurrentRecipeFavorite();
      if (isInProgress) continueFromSavedProgress();
    };
    fetchRecipeDetails();
  }, [id]);

  // Handling functions
  const handleShareButtonClick = () => {
    setIsCopied(true);
    const pathnameWithoutInProgress = pathname?.replace(IN_PROGRESS_PATH, '');
    copy(`http://localhost:3000${pathnameWithoutInProgress}`);
  };

  const handleStartRecipeButtonClick = () => history
    .push(`${pathname}${IN_PROGRESS_PATH}`);

  // Favorites
  const saveCurrentRecipe = () => {
    handleFavoritesLocalStorage(handleSaveFavorite(isMeal, recipeDetails));
    setIsFavorite(true);
  };

  const removeCurrentRecipe = () => {
    handleFavoritesLocalStorage(handleRemoveFavorite(id));
    setIsFavorite(false);
  };

  const handleFavoriteButtonClick = () => (isFavorite
    ? removeCurrentRecipe()
    : saveCurrentRecipe());

  // In progress
  const saveIngredient = (value) => {
    handleInProgressLocalStorage(
      handleSaveOrRemoveInProgress(isMeal, id, [...usedIngredients, value]),
    );
    setUsedIngredients([...usedIngredients, value]);
  };

  const removeIngredient = (value) => {
    const updatedUsedIngredients = usedIngredients
      .filter((usedIngredient) => usedIngredient !== value);
    handleInProgressLocalStorage(
      handleSaveOrRemoveInProgress(isMeal, id, [...updatedUsedIngredients]),
    );
    setUsedIngredients([...updatedUsedIngredients]);
  };

  const handleCheckboxClick = ({ target: { value } }) => {
    const isIngredientUsed = usedIngredients
      .some((usedIngredient) => usedIngredient === value);
    return isIngredientUsed
      ? removeIngredient(value)
      : saveIngredient(value);
  };

  // Rendering functions
  const getIngredientsAndMeasuresInfoFromDetails = (accIngredientAndMeasure, currKey) => {
    const isCurrentKeyAnIngredient = currKey.includes('strIngredient');
    const doesCurrentIngredientHaveValue = recipeDetails[currKey];

    if (isCurrentKeyAnIngredient && doesCurrentIngredientHaveValue) {
      const ingredientIndex = currKey?.replace(/\D/g, '');
      const ingredient = recipeDetails[currKey];
      const measure = recipeDetails[`strMeasure${ingredientIndex}`] || '';
      const isChecked = usedIngredients
        .some((usedIngredient) => usedIngredient === ingredient);
      const newIngredientAndMeasure = (
        <div
          key={ currKey }
          data-testid={ `${ingredientIndex - 1}-ingredient-name-and-measure` }
        >
          <label
            data-testid={ `${ingredientIndex - 1}-ingredient-step` }
            htmlFor={ ingredient }
            style={ { textDecoration: isChecked && 'line-through' } }
          >
            <input
              id={ ingredient }
              type="checkbox"
              value={ ingredient }
              checked={ isChecked }
              onClick={ handleCheckboxClick }
            />
            { `${ingredient} ${measure}` }
          </label>
        </div>
      );
      return [...accIngredientAndMeasure, newIngredientAndMeasure];
    }
    return accIngredientAndMeasure;
  };

  const renderIngredientsAndMeasures = () => {
    const recipeDetailsKeys = (Object.keys(recipeDetails) || []);
    const ingredientsAndMeasuresInfo = recipeDetailsKeys
      .reduce(getIngredientsAndMeasuresInfoFromDetails, []);

    return (
      <div data-testid="instructions">
        { ingredientsAndMeasuresInfo }
      </div>
    );
  };

  return (
    <div>
      <input
        data-testid="share-btn"
        type="image"
        src={ shareIcon }
        alt="share button"
        onClick={ handleShareButtonClick }
      />
      { isCopied && <span>Link copied!</span> }
      <input
        data-testid="favorite-btn"
        type="image"
        src={ isFavorite
          ? blackHeartIcon
          : whiteHeartIcon }
        alt="favorite button"
        onClick={ handleFavoriteButtonClick }
      />
      <h1 data-testid="recipe-title">
        { isMeal ? recipeDetails.strMeal : recipeDetails.strDrink }
      </h1>
      <h3 data-testid="recipe-category">
        { recipeDetails.strCategory }
        { !isMeal && recipeDetails.strAlcoholic }
      </h3>
      <img
        data-testid="recipe-photo"
        src={ isMeal ? recipeDetails.strMealThumb : recipeDetails.strDrinkThumb }
        alt="recipe"
      />
      { renderIngredientsAndMeasures() }
      <section data-testid="instructions">
        { recipeDetails.strInstructions }
      </section>
      { isMeal && (
        <div data-testid="video">
          <iframe
            width="320"
            height="180"
            src={ `${recipeDetails.strYoutube?.replace('watch?v=', 'embed/')}` }
            frameBorder="0"
            allow="clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title="Embedded youtube"
          />
        </div>) }
      { !isDone && (
        <button
          data-testid="finish-recipe-btn"
          type="button"
          onClick={ handleStartRecipeButtonClick }
        >
          { isInProgress ? 'Continue Recipe' : 'Start Recipe' }
        </button>) }
    </div>
  );
}

export default RecipeInProgress;
