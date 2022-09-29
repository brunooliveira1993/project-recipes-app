import React, { useContext, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ALL_BTN, CATEGORIES_MAX_AMOUNT, DEFAULT_RECIPES_MAX_AMOUNT } from '../constants';
import RecipesContext from '../context/RecipesContext';
import { handleCategoryCatalogApiUrl, handleCategoryRecipesApiUrl, handleDefaultApiUrl,
  isMealsOrDrinks } from '../helpers';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CardMain from '../components/CardMain';
import { fetchRecipes } from '../services';
import './Recipes.css'

function Recipes() {
  const {
    recipesData,
    getRecipesData,
  } = useContext(RecipesContext);
  const { pathname } = useLocation();
  const [, setCurrentCategory] = useState(''); // currentCategory
  const [categories, setCategories] = useState([]);

  // On update functions
  const isMeal = isMealsOrDrinks(pathname);

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
  const renderRecipes = () => {
    const defaultRecipes = recipesData
      .slice(0, Math.min(DEFAULT_RECIPES_MAX_AMOUNT, recipesData.length));

    const defaultRecipesCards = defaultRecipes
      .map((recipe, index) => {
        const id = isMeal ? recipe.idMeal : recipe.idDrink;
        const path = `${pathname}/${id}`;
        const imagem = isMeal ? recipe.strMealThumb : recipe.strDrinkThumb;
        const title = isMeal ? recipe.strMeal : recipe.strDrink;
        return (
          <Link
            key={ id }
            to={ path }
          >
            <CardMain
              index={ index }
              img={ imagem }
              title={ title }
            />
          </Link>
        );
      });

    return (
      <div className="recipies-container">
        { defaultRecipesCards }
      </div>
    );
  };

  const renderCategoryButtons = () => {
    const requiredCategories = (Object.values(categories)[0] || [])
      .slice(0, CATEGORIES_MAX_AMOUNT);

    const categoryFilterButtons = requiredCategories
      .map(({ strCategory }) => (
        <button
          data-testid={ `${strCategory}-category-filter` }
          key={ strCategory }
          type="button"
          data-category={ strCategory }
          onClick={ handleCategoryButtonClick }
        >
          { strCategory }
        </button>));

    return (
      <div>
        { categoryFilterButtons }
        <button
          data-testid="All-category-filter"
          type="button"
          onClick={ handleAllCategoriesButtonClick }
        >
          { ALL_BTN }
        </button>
      </div>
    );
  };

  return (
    <div className="main-recipies">
      <Header />
      { renderCategoryButtons() }
      { renderRecipes() }
      <Footer />
    </div>
  );
}

export default Recipes;
