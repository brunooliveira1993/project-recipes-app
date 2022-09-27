import React, { useEffect, useState, useContext } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import CardMain from '../components/CardMain';
import { DRINKS_PATH, MEALS_PATH,
  RECOMMENDATIONS_RECIPES_MAX_AMOUNT } from '../constants';
import RecipesContext from '../context/RecipesContext';
import { handleDefaultApiUrl, handleRecipeDetailsApiUrl,
  verifyIfMealsOrDrinks } from '../helpers';
import { fetchRecipes } from '../services';

function RecipeDetails() {
  const {
    recipesData,
    getRecipesData,
  } = useContext(RecipesContext);
  const { id } = useParams();
  const { pathname } = useLocation();
  const [recipeDetails, setRecipeDetails] = useState({});

  const isMeal = verifyIfMealsOrDrinks(pathname);

  useEffect(() => {
    const fetchRecipeDetails = async () => {
      const data = await fetchRecipes(handleRecipeDetailsApiUrl(isMeal, id));
      const newRecipeDetails = Object.values(data)[0][0];
      setRecipeDetails(newRecipeDetails);
    };
    fetchRecipeDetails();
    getRecipesData(handleDefaultApiUrl(!isMeal));
  }, [isMeal]);

  console.log(recipeDetails);

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
        .slice(0, RECOMMENDATIONS_RECIPES_MAX_AMOUNT)
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
  //       console.log(ingredient.includes('strIngredient'));
  //       console.log(recipeDetails[ingredient]);
  //       return ingredient.includes('strIngredient') && recipeDetails[ingredient];
  //     });
  //   console.log(allIngredients);
  //   return allIngredients;
  // };

  return (
    <div>
      <h1 data-testid="recipe-title">
        { isMeal ? recipeDetails.strMeal : recipeDetails.strDrink }
      </h1>
      <h3 data-testid="recipe-category">
        { recipeDetails.strCategory }
        { !isMeal && 'Alcoholic' }
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
    </div>
  );
}

export default RecipeDetails;
