import React, { useEffect, useState } from 'react';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import { handleRecipeDetailsApiUrl, handleRemoveFavorite, handleSaveFavorite,
  // isRecipeInProgress,
  isMealsOrDrinks, handleSaveOrRemoveInProgress,
  getRecipeProgress, isRecipeFinished, handleAddDone } from '../helpers';
import { fetchRecipes, getFavoriteFromLocalStorage,
  handleDoneLocalStorage,
  handleFavoritesLocalStorage, handleInProgressLocalStorage } from '../services';
import { DONE_RECIPES_PATH, IN_PROGRESS_PATH } from '../constants';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/like.png';
import shareIcon from '../images/shareIcon.svg';
import './RecipeInProgress.css';

const copy = require('clipboard-copy');

function RecipeInProgress() {
  const { id } = useParams();
  const { pathname } = useLocation();
  const history = useHistory();
  const [recipeDetails, setRecipeDetails] = useState({});
  const [isCopied, setIsCopied] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  // On mount Functions
  const isMeal = isMealsOrDrinks(pathname);
  // const isInProgress = isRecipeInProgress(isMeal, id);
  const INITIAL_INGRIEDNTS = getRecipeProgress(isMeal, id);
  const [usedIngredients, setUsedIngredients] = useState(INITIAL_INGRIEDNTS);
  const isFinished = isRecipeFinished(recipeDetails, usedIngredients);

  const isCurrentRecipeFavorite = () => {
    const currentFavoriteRecipes = getFavoriteFromLocalStorage() || [];
    const isCurrentRecipeIdAlreadySaved = currentFavoriteRecipes
      .some(({ id: favoriteId }) => favoriteId === id);
    setIsFavorite(isCurrentRecipeIdAlreadySaved);
  };

  // const continueFromSavedProgress = () => {
  //   const currentRecipeInProgress = getRecipeProgress(isMeal, id);
  //   setUsedIngredients(currentRecipeInProgress);
  // };

  useEffect(() => {
    const fetchRecipeDetails = async () => {
      const data = await fetchRecipes(handleRecipeDetailsApiUrl(isMeal, id));
      const newRecipeDetails = Object.values(data)[0][0];
      setRecipeDetails(newRecipeDetails);
      isCurrentRecipeFavorite();
      // if (isInProgress) continueFromSavedProgress();
    };
    fetchRecipeDetails();
  }, [id]);

  // Handling functions
  const handleShareButtonClick = () => {
    setIsCopied(true);
    const pathnameWithoutInProgress = pathname?.replace(IN_PROGRESS_PATH, '');
    copy(`http://localhost:3000${pathnameWithoutInProgress}`);
  };

  const handleFinishRecipeButtonClick = () => {
    history.push(DONE_RECIPES_PATH);
    handleDoneLocalStorage(handleAddDone(isMeal, recipeDetails));
  };

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
  const saveIngredient = (ingredient) => {
    handleInProgressLocalStorage(
      handleSaveOrRemoveInProgress(isMeal, id, [...usedIngredients, ingredient]),
    );
    setUsedIngredients([...usedIngredients, ingredient]);
  };

  const removeIngredient = (ingredient) => {
    const updatedUsedIngredients = usedIngredients
      .filter((usedIngredient) => usedIngredient !== ingredient);
    handleInProgressLocalStorage(
      handleSaveOrRemoveInProgress(isMeal, id, [...updatedUsedIngredients]),
    );
    setUsedIngredients([...updatedUsedIngredients]);
  };

  const handleCheckboxClick = ({ target: { value: ingredient } }) => {
    const isIngredientUsed = usedIngredients.includes(ingredient);
    return isIngredientUsed
      ? removeIngredient(ingredient)
      : saveIngredient(ingredient);
  };

  // Rendering functions
  const getIngredientsAndMeasuresInfoFromDetails = (accIngredientAndMeasure, currKey) => {
    const isCurrentKeyAnIngredient = currKey.includes('strIngredient');
    const doesCurrentIngredientHaveValue = recipeDetails[currKey];

    if (isCurrentKeyAnIngredient && doesCurrentIngredientHaveValue) {
      const ingredientIndex = currKey?.replace(/\D/g, '');
      const ingredient = recipeDetails[currKey];
      const measure = recipeDetails[`strMeasure${ingredientIndex}`] || '';
      const isChecked = usedIngredients.includes(ingredientIndex);
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
              value={ ingredientIndex }
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
    const recipeDetailsKeys = (Object.keys(recipeDetails));
    const ingredientsAndMeasuresInfo = recipeDetailsKeys
      .reduce(getIngredientsAndMeasuresInfoFromDetails, []);

    return (
      <div data-testid="instructions">
        { ingredientsAndMeasuresInfo }
      </div>
    );
  };

  return (
    <div className="recipes-progress-container">
      <div className="header-details">
        <h1 className="recipe-title" data-testid="recipe-title">
          { isMeal ? recipeDetails.strMeal : recipeDetails.strDrink }
        </h1>
        <img
          className="recipe-img"
          data-testid="recipe-photo"
          src={ isMeal ? recipeDetails.strMealThumb : recipeDetails.strDrinkThumb }
          alt="recipe"
        />
      </div>
      <div className="top-header">
        <h3 className="recipe-category" data-testid="recipe-category">
          { recipeDetails.strCategory }
          { !isMeal && recipeDetails.strAlcoholic }
        </h3>
        <div className="btn-containe">
          <input
            className="share-btn"
            data-testid="share-btn"
            type="image"
            src={ shareIcon }
            alt="share button"
            onClick={ handleShareButtonClick }
          />
          { isCopied && <span>Link copied!</span> }
          <input
            className="fav-btn"
            data-testid="favorite-btn"
            type="image"
            src={ isFavorite ? blackHeartIcon : whiteHeartIcon }
            alt="favorite button"
            onClick={ handleFavoriteButtonClick }
          />
        </div>
      </div>
      <div className="instructions">
        <h2 className="section-title">Ingredients</h2>
        <div className="ingredients-container">
          { renderIngredientsAndMeasures() }
        </div>
      </div>
      <div className="instructions">
        <h2 className="section-title">Instructions</h2>
        <section
          className="instructions-container"
          data-testid="instructions"
        >
          { recipeDetails.strInstructions }
        </section>
      </div>
      { isMeal && (
        <div>
          <h2 className="video-title">Video</h2>
          <div
            data-testid="video"
            className="video"
          >
            <iframe
              width="320"
              height="180"
              src={ `${recipeDetails.strYoutube?.replace('watch?v=', 'embed/')}` }
              frameBorder="0"
              allow="clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title="Embedded youtube"
            />
          </div>
          <br />
        </div>) }
      <button
        className="finish-recipe-btn"
        data-testid="finish-recipe-btn"
        type="button"
        onClick={ handleFinishRecipeButtonClick }
        disabled={ !isFinished }
      >
        Finish Recipe
      </button>
    </div>
  );
}

export default RecipeInProgress;
