import React, { useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import RecipesContext from '../context/RecipesContext';
import { handleDefaultApiUrl, verifyIfMealsOrDrinks } from '../helpers';

function Recipes() {
  const { recipesList, getRecipesData } = useContext(RecipesContext);
  const { pathname } = useLocation();

  const isMeal = verifyIfMealsOrDrinks(pathname);
  console.log(isMeal);

  const url = handleDefaultApiUrl(isMeal);
  console.log(url);

  useEffect(() => getRecipesData(url), []);
  console.log(recipesList);

  return (
    <div>
      Recipes
    </div>
  );
}

export default Recipes;
