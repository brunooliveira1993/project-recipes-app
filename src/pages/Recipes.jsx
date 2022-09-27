import React, { useContext, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ALL_BTN, CATEGORIES_MAX_AMOUNT, DEFAULT_RECIPES_MAX_AMOUNT } from '../constants';
import RecipesContext from '../context/RecipesContext';
import { handleCategoryCatalogApiUrl, handleCategoryRecipesApiUrl, handleDefaultApiUrl,
  verifyIfMealsOrDrinks } from '../helpers';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CardMain from '../components/CardMain';
// import { fetchRecipes } from '../services';

function Recipes() {
  // const { recipesData, getRecipesData } = useContext(RecipesContext);
  // const [categories, setCategories] = useState([]);
  const { recipesData, getRecipesData, categories,
    getCategories } = useContext(RecipesContext);
  const { pathname } = useLocation();
  const [, setCurrentCategory] = useState(''); // currentCategory

  // On mount functions
  const isMeal = verifyIfMealsOrDrinks(pathname);

  // const getCategories = async (url) => {
  //   const allCategories = await fetchRecipes(url);
  //   setCategories(allCategories);
  //   return allCategories
  // };

  useEffect(() => {
    getRecipesData(handleDefaultApiUrl(isMeal));
    getCategories(handleCategoryCatalogApiUrl(isMeal));
  }, [isMeal]);

  // Handling function
  const handleCategoryButtonClick = ({ target: { dataset: { category } } }) => {
    setCurrentCategory((prevCategory) => {
      if (prevCategory === category) {
        getRecipesData(handleDefaultApiUrl(isMeal));
        return '';
      }
      getRecipesData(handleCategoryRecipesApiUrl(isMeal, category));
      return category;
    });
  };

  const handleAllCategoriesButtonClick = () => {
    getRecipesData(handleDefaultApiUrl(isMeal));
  };

  // Rendering functions
  const renderRecipes = () => recipesData
    .slice(0, DEFAULT_RECIPES_MAX_AMOUNT)
    .map((recipe, index) => (
      <Link
        key={ isMeal ? recipe.idMeal : recipe.idDrink }
        to={ `${pathname}/${isMeal ? recipe.idMeal : recipe.idDrink}` }
      >
        <CardMain
          index={ index }
          img={ isMeal ? recipe.strMealThumb : recipe.strDrinkThumb }
          title={ isMeal ? recipe.strMeal : recipe.strDrink }
        />
      </Link>
    ));
  const renderCategories = () => categories
    .slice(0, CATEGORIES_MAX_AMOUNT)
    .map(({ strCategory }) => (
      <button
        data-testid={ `${strCategory}-category-filter` }
        key={ strCategory }
        type="button"
        data-category={ strCategory }
        onClick={ handleCategoryButtonClick }
      >
        { strCategory }
      </button>
    ));

  return (
    <div>
      <Header />
      { renderCategories() }
      <button
        data-testid="All-category-filter"
        type="button"
        onClick={ handleAllCategoriesButtonClick }
      >
        { ALL_BTN }
      </button>
      { renderRecipes() }
      <Footer />
    </div>
  );
}

export default Recipes;
