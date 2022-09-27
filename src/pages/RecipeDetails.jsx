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
      const newRecipeDetails = await fetchRecipes(handleRecipeDetailsApiUrl(isMeal, id));
      console.log(newRecipeDetails);
      setRecipeDetails(newRecipeDetails);
    };
    fetchRecipeDetails();
  }, []);
  return (
    <div>
      RecipeDetails
    </div>
  );
}

export default RecipeDetails;
