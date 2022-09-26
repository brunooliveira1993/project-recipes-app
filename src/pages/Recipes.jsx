import React, { useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { DEFAULT_RECIPES_MAX_AMOUNT } from '../constants';
import RecipesContext from '../context/RecipesContext';
import { handleDefaultApiUrl, verifyIfMealsOrDrinks } from '../helpers';

function Recipes() {
  const { recipesData, getRecipesData } = useContext(RecipesContext);
  const { pathname } = useLocation();

  const isMeal = verifyIfMealsOrDrinks(pathname);
  console.log(isMeal);

  const url = handleDefaultApiUrl(isMeal);
  console.log(url);

  useEffect(() => getRecipesData(url), []);
  console.log(recipesData.slice(0, DEFAULT_RECIPES_MAX_AMOUNT));

  return (
    <div>
      Recipes
    </div>
  );
}

export default Recipes;
