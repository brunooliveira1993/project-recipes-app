import React, { useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { DEFAULT_RECIPES_MAX_AMOUNT } from '../constants';
import RecipesContext from '../context/RecipesContext';
import { handleDefaultApiUrl, verifyIfMealsOrDrinks } from '../helpers';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Recipes() {
  const { recipesData, getRecipesData } = useContext(RecipesContext);
  const { pathname } = useLocation();

  const isMeal = verifyIfMealsOrDrinks(pathname);

  useEffect(() => {
    const url = handleDefaultApiUrl(isMeal);
    getRecipesData(url);
  }, []);
  console.log(recipesData.slice(0, DEFAULT_RECIPES_MAX_AMOUNT));

  return (
    <div>
      <Header />
      <Footer />
    </div>
  );
}

export default Recipes;
