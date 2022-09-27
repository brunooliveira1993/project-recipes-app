import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { handleRecipeDetailsApiUrl, verifyIfMealsOrDrinks } from '../helpers';
import { fetchRecipes } from '../services';

function RecipeDetails() {
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
  }, []);
  // console.log(Object.keys(recipeDetails));
  // console.log(recipeDetails);

  // Render functions
  const renderIngredientsAndMeasures = () => {
    const allIngredients = (Object.keys(recipeDetails) || [])
      .reduce((acc, currIngredient) => (
        (currIngredient.includes('strIngredient') && recipeDetails[currIngredient])
          ? [
            ...acc,
            <div
              key={ currIngredient }
              data-testid={ `${currIngredient.replace(/\D/g, '')}-ingredient-name-and-measure` }
            >
              <span>{ recipeDetails[currIngredient] }</span>
              <span>{recipeDetails[`strMeasure${currIngredient.replace(/\D/g, '')}`]}</span>
            </div>,
          ]
          : acc
      ), []);
    console.log(allIngredients);
    return allIngredients;
  };
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
      { renderIngredientsAndMeasures() }
    </div>
  );
}

export default RecipeDetails;
