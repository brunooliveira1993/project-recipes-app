import React, { useContext, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { CATEGORIES_MAX_AMOUNT, DEFAULT_RECIPES_MAX_AMOUNT,
  CATEGORY_NEED_WRAP } from '../constants';
import RecipesContext from '../context/RecipesContext';
import { handleCategoryCatalogApiUrl, handleCategoryRecipesApiUrl, handleDefaultApiUrl,
  isMealsOrDrinks } from '../helpers';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CardMain from '../components/CardMain';
import { fetchRecipes } from '../services';
import './Recipes.css';
import meals0 from '../images/category/meals/beef.svg';
import meals1 from '../images/category/meals/breakfast.svg';
import meals2 from '../images/category/meals/chicken.svg';
import meals3 from '../images/category/meals/dessert.svg';
import meals4 from '../images/category/meals/lamb.svg';
import meals5 from '../images/category/meals/all.svg';
import drinks0 from '../images/category/drinks/ordinary.svg';
import drinks1 from '../images/category/drinks/cocktail.svg';
import drinks2 from '../images/category/drinks/shake.svg';
import drinks3 from '../images/category/drinks/other.svg';
import drinks4 from '../images/category/drinks/cocoa.svg';
import drinks5 from '../images/category/drinks/all.svg';

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

  // Categorys svg array

  const mealsImg = [meals0, meals1, meals2, meals3, meals4];
  const drinksImg = [drinks0, drinks1, drinks2, drinks3, drinks4];

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
      .map(({ strCategory }, index) => (
        <div
          className="category"
          key={ strCategory }
        >
          <input
            className={ `${index}-category` }
            data-testid={ `${strCategory}-category-filter` }
            type="image"
            src={ isMeal ? mealsImg[index] : drinksImg[index] }
            alt="category-img"
            onClick={ handleCategoryButtonClick }
          />
          <span
            className="category-name"
          >
            { !isMeal && index === CATEGORY_NEED_WRAP ? 'Other/ Unknow ' : strCategory }
          </span>
        </div>));

    return (
      <div className="category-container">
        { categoryFilterButtons }
        <div className="category">
          <input
            data-testid="All-category-filter"
            type="image"
            src={ isMeal ? meals5 : drinks5 }
            alt="category-img"
            onClick={ handleAllCategoriesButtonClick }
          />
          <span className="category-name">All</span>
        </div>
      </div>
    );
  };

  return (
    <div className="main-recipies">
      <Header />
      { renderCategoryButtons() }
      { renderRecipes() }
      <div className="pre-footer" />
      <Footer />
    </div>
  );
}

export default Recipes;
