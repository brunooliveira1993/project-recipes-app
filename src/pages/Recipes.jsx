import React, { useContext, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ALL_BTN, CATEGORIES_MAX_AMOUNT, DEFAULT_RECIPES_MAX_AMOUNT } from '../constants';
import RecipesContext from '../context/RecipesContext';
import { handleCategoryCatalogApiUrl, handleCategoryRecipesApiUrl, handleDefaultApiUrl,
  verifyIfMealsOrDrinks } from '../helpers';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CardMain from '../components/CardMain';
import { fetchRecipes } from '../services';

function Recipes() {
  const {
    recipesData,
    getRecipesData,
  } = useContext(RecipesContext);
  const { pathname } = useLocation();
  const [, setCurrentCategory] = useState(''); // currentCategory
  const [categories, setCategories] = useState([]);

  // On update functions
  const isMeal = verifyIfMealsOrDrinks(pathname);

  useEffect(() => {
    getRecipesData(handleDefaultApiUrl(isMeal));
    const fetchCategories = async () => {
      const allCategories = await fetchRecipes(handleCategoryCatalogApiUrl(isMeal));
      setCategories(allCategories);
    };
    fetchCategories();
  }, [isMeal]);

  // Handling function
  const toggleCategoryButton = (category) => (prevCategory) => {
    if (prevCategory === category) {
      getRecipesData(handleDefaultApiUrl(isMeal));
      return '';
    }
    getRecipesData(handleCategoryRecipesApiUrl(isMeal, category));
    return category;
  };

  const handleCategoryButtonClick = ({ target: { dataset: { category } } }) => {
    setCurrentCategory(toggleCategoryButton(category));
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

  const renderCategoryButtons = () => (
    <div>
      { (Object.values(categories)[0] || [])
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
        )) }
      <button
        data-testid="All-category-filter"
        type="button"
        onClick={ handleAllCategoriesButtonClick }
      >
        { ALL_BTN }
      </button>
    </div>
  );

  return (
    <div>
      <Header />
      { renderCategoryButtons() }
      { renderRecipes() }
      <Footer />
    </div>
  );
}

export default Recipes;
