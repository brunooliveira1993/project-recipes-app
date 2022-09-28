import React, { useEffect, useState, useContext } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import CardMain from '../components/CardMain';
import { DRINKS_PATH, MEALS_PATH,
  RECOMMENDATIONS_RECIPES_MAX_AMOUNT } from '../constants';
import RecipesContext from '../context/RecipesContext';
import { handleDefaultApiUrl, handleRecipeDetailsApiUrl,
  handleRemoveFavoriteDataStructure,
  handleSaveFavoriteDataStructure,
  verifyIfMealsOrDrinks } from '../helpers';
import { fetchRecipes, getFavoriteRecipesFromLocalStorage,
  handleFavoritesLocalStorage } from '../services';

const copy = require('clipboard-copy');

function RecipeDetails() {
  const {
    recipesData,
    getRecipesData,
  } = useContext(RecipesContext);
  const { id } = useParams();
  const { pathname } = useLocation();
  const [recipeDetails, setRecipeDetails] = useState({});
  const [isCopied, setIsCopied] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  const isMeal = verifyIfMealsOrDrinks(pathname);

  const isCurrentRecipeFavorite = () => {
    const currentFavoriteRecipes = getFavoriteRecipesFromLocalStorage() || [];
    const isCurrentRecipeIdAlreadySaved = currentFavoriteRecipes
      .some(({ id: favoriteId }) => favoriteId === id);
    console.log(isCurrentRecipeIdAlreadySaved);
    setIsFavorite(isCurrentRecipeIdAlreadySaved);
    // if (isCurrentRecipeIdAlreadySaved) setIsFavorite(isCurrentRecipeIdAlreadySaved);
  };

  useEffect(() => {
    const fetchRecipeDetails = async () => {
      if (!id || typeof id !== 'string') return;
      const data = await fetchRecipes(handleRecipeDetailsApiUrl(isMeal, id));
      const newRecipeDetails = Object.values(data)[0][0];
      setRecipeDetails(() => {
        getRecipesData(handleDefaultApiUrl(!isMeal));
        isCurrentRecipeFavorite();
        return newRecipeDetails;
      });
    };
    fetchRecipeDetails();
  }, [id]);

  // Handling functions
  const handleShareButtonClick = () => {
    setIsCopied(true);
    copy(`http://localhost:3000${pathname}`);
  };

  const saveCurrentRecipe = () => {
    handleFavoritesLocalStorage(handleSaveFavoriteDataStructure(isMeal, recipeDetails));
    setIsFavorite(true);
  };

  const removeCurrentRecipe = () => {
    handleFavoritesLocalStorage(handleRemoveFavoriteDataStructure(id));
    setIsFavorite(false);
  };

  const handleFavoriteButtonClick = () => (isFavorite
    ? removeCurrentRecipe()
    : saveCurrentRecipe());

  // Render functions
  const renderIngredientsAndMeasures = () => (
    <div data-testid="instructions">
      { (Object.keys(recipeDetails) || [])
        .reduce((accIngredientAndMeasure, currIngredient) => (
          (currIngredient.includes('strIngredient') && recipeDetails[currIngredient])
            ? [
              ...accIngredientAndMeasure,
              <div
                key={ currIngredient }
                data-testid={ `${currIngredient.replace(/\D/g, '') - 1}-ingredient-name-and-measure` }
              >
                <span>{ recipeDetails[currIngredient] }</span>
                <span>{ recipeDetails[`strMeasure${currIngredient?.replace(/\D/g, '')}`] }</span>
              </div>,
            ]
            : accIngredientAndMeasure
        ), []) }
    </div>
  );

  const renderRecommendations = () => (
    <div className="recommendations-container">
      { recipesData
        .slice(0, Math.min(RECOMMENDATIONS_RECIPES_MAX_AMOUNT, recipesData.length))
        .map((recipe, index) => (
          <Link
            key={ !isMeal ? recipe.idMeal : recipe.idDrink }
            to={ !isMeal
              ? `${MEALS_PATH}/${recipe.idMeal}`
              : `${DRINKS_PATH}/${recipe.idDrink}` }
          >
            <CardMain
              index={ index }
              img={ !isMeal ? recipe.strMealThumb : recipe.strDrinkThumb }
              title={ !isMeal ? recipe.strMeal : recipe.strDrink }
            />
          </Link>
        )) }
    </div>
  );
  // const renderIngredientsAndMeasures = () => {
  //   const allIngredients = (Object.keys(recipeDetails) || [])
  //     .filter((ingredient) => {
  //       return ingredient.includes('strIngredient') && recipeDetails[ingredient];
  //     });
  //   return allIngredients;
  // };

  return (
    <div>
      <button
        data-testid="share-btn"
        type="button"
        onClick={ handleShareButtonClick }
      >
        <img
          src="src/images/shareIcon.svg"
          alt="share button"
        />
      </button>
      { isCopied && <span>Link copied!</span> }
      {/* <button
        data-testid="favorite-btn"
        type="button"
        onClick={ handleFavoriteButtonClick }
      >
        <img
          src={ isFavorite
            ? 'src/images/whiteHeartIcon.svg'
            : 'src/images/blackHeartIcon.svg' }
          alt="favorite button"
        />whiteHeartIcon
      </button> */}
      <input
        data-testid="favorite-btn"
        type="image"
        src={ isFavorite
          ? 'src/images/blackHeartIcon.svg'
          : 'src/images/whiteHeartIcon.svg' }
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
            width="853"
            height="480"
            src={ `${recipeDetails.strYoutube?.replace('watch?v=', 'embed/')}` }
            frameBorder="0"
            allow="clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title="Embedded youtube"
          />
        </div>) }
      { renderRecommendations() }
      <button
        data-testid="start-recipe-btn"
        type="button"
      >
        Start Recipe
      </button>
    </div>
  );
}

export default RecipeDetails;
