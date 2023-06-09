import React, { useEffect, useState, useContext } from 'react';
import { Link, useHistory, useLocation, useParams } from 'react-router-dom';
import CardMain from '../components/CardMain';
import RecipesContext from '../context/RecipesContext';
import { handleDefaultApiUrl, handleRecipeDetailsApiUrl,
  handleRemoveFavorite, handleSaveFavorite,
  isRecipeDone, isRecipeInProgress,
  isMealsOrDrinks } from '../helpers';
import { fetchRecipes, getFavoriteFromLocalStorage,
  handleFavoritesLocalStorage } from '../services';
import { DRINKS_PATH, IN_PROGRESS_PATH, MEALS_PATH,
  RECOMMENDATIONS_RECIPES_MAX_AMOUNT } from '../constants';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/like.png';
import shareIcon from '../images/shareIcon.svg';
import './RecipeDetails.css';

const copy = require('clipboard-copy');

function RecipeDetails() {
  const {
    recipesData,
    getRecipesData,
  } = useContext(RecipesContext);
  const { id } = useParams();
  const { pathname } = useLocation();
  const history = useHistory();
  const [recipeDetails, setRecipeDetails] = useState({});
  const [isCopied, setIsCopied] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

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

  useEffect(() => {
    const fetchRecipeDetails = async () => {
      const data = await fetchRecipes(handleRecipeDetailsApiUrl(isMeal, id));
      const newRecipeDetails = Object.values(data)[0][0];
      setRecipeDetails(newRecipeDetails);
      getRecipesData(handleDefaultApiUrl(!isMeal));
      isCurrentRecipeFavorite();
    };
    fetchRecipeDetails();
  }, [id]);

  // Handling functions
  const handleShareButtonClick = () => {
    setIsCopied(true);
    copy(`http://localhost:3000${pathname}`);
  };
  

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

  const handleStartRecipeButtonClick = () => history
    .push(`${pathname}${IN_PROGRESS_PATH}`);

  // Rendering functions
  const getIngredientsAndMeasuresInfoFromDetails = (accIngredientAndMeasure, currKey) => {
    const isCurrentKeyAnIngredient = currKey.includes('strIngredient');
    const doesCurrentIngredientHaveValue = recipeDetails[currKey];

    if (isCurrentKeyAnIngredient && doesCurrentIngredientHaveValue) {
      const ingredientIndex = currKey?.replace(/\D/g, '');
      const ingredient = recipeDetails[currKey];
      const measure = recipeDetails[`strMeasure${ingredientIndex}`];
      const newIngredientAndMeasure = (
        <div
          key={ currKey }
          data-testid={ `${ingredientIndex - 1}-ingredient-name-and-measure` }
        >
          <span>{ `• ${ingredient} ${measure}` }</span>
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
      <div
        data-testid="instructions"
        className="instructions"
      >
        <h2 className="section-title">Ingredients</h2>
        <div className="ingredients-container">
          { ingredientsAndMeasuresInfo }
        </div>
      </div>
    );
  };

  const renderRecommendations = () => {
    const recommendedRecipes = recipesData
      .slice(0, Math.min(RECOMMENDATIONS_RECIPES_MAX_AMOUNT, recipesData.length));

    const recommendedRecipesCards = recommendedRecipes
      .map((recipe, index) => {
        const recommendationId = !isMeal ? recipe.idMeal : recipe.idDrink;
        const image = !isMeal ? recipe.strMealThumb : recipe.strDrinkThumb;
        const title = !isMeal ? recipe.strMeal : recipe.strDrink;
        const path = !isMeal
          ? `${MEALS_PATH}/${recommendationId}`
          : `${DRINKS_PATH}/${recommendationId}`;
        return (
          <div
            key={ recommendationId }
            className="card-recomendation"
          >
            <Link
              to={ path }
            >
              <CardMain
                isRecommendation
                index={ index }
                img={ image }
                title={ title }
              />
            </Link>
          </div>
        );
      });

    return (
      <div className="recomendations-container">
        { recommendedRecipesCards }
      </div>
    );
  };

  return (
    <div className="recipes-details-container">
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
        <div className="btn-container">
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
      { renderIngredientsAndMeasures() }
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
      <div className="instructions">
        <h2 className="section-title">Sugestions</h2>
        { renderRecommendations() }
      </div>
      { !isDone && (
        <button
          className="start-recipe-btn"
          data-testid="start-recipe-btn"
          type="button"
          onClick={ handleStartRecipeButtonClick }
        >
          { isInProgress ? 'Continue Recipe' : 'Start Recipe' }
        </button>) }
    </div>
  );
}

export default RecipeDetails;
