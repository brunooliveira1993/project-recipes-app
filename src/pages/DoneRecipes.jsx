import { React, useState, useEffect } from 'react';
import Header from '../components/Header';
import CardProfile from '../components/CardProfile';
import all from '../images/all.svg';
import drinksLogo from '../images/drinks.svg';
import mealsLogo from '../images/meals.svg';
import './DoneRecipe.css';
import Footer from '../components/Footer';

function DoneRecipes() {
  const readUser = () => {
    if (Object.keys(localStorage).includes('doneRecipes')) {
      return JSON.parse(localStorage.getItem('doneRecipes'));
    }
    const saveUser = (user) => localStorage.setItem('doneRecipes', JSON.stringify(user));
    saveUser([]);
    return JSON.parse(localStorage.getItem('doneRecipes'));
  };
  const [listDefault, setListDefault] = useState(readUser());
  const [renderItem, setRenderItem] = useState([]);
  const [localStorageCreate, setLocalStorageCreate] = useState(false);

  useEffect(() => {
    const user = readUser();
    if (user !== []) {
      setLocalStorageCreate(true);
      setRenderItem(user);
      setListDefault(user);
    }
  }, []);

  const renderCard = () => renderItem.map((item, index) => (
    <CardProfile
      renderPage={ setLocalStorageCreate }
      key={ index }
      item={ item }
      index={ index }
    />
  ));

  const mealFilter = () => {
    const meals = listDefault.filter((meal) => meal.type === 'meal');
    setRenderItem(meals);
  };

  const drinkFilter = () => {
    const drinks = listDefault.filter((drink) => drink.type === 'drink');
    setRenderItem(drinks);
  };

  const allFilter = () => {
    setRenderItem(listDefault);
  };

  return (
    <div className="done-main-container">
      <Header />
      <div className="filter-done-container">
        <div className="done-filter">
          <input
            data-testid="filter-by-all-btn"
            type="image"
            src={ all }
            alt="category-logo"
            onClick={ allFilter }
          />
          <span className="filter-name">All</span>
        </div>
        <div className="done-filter">
          <input
            data-testid="filter-by-meal-btn"
            type="image"
            src={ mealsLogo }
            alt="category-logo"
            onClick={ mealFilter }
          />
          <span className="filter-name">Meal</span>
        </div>
        <div className="done-filter">
          <input
            data-testid="filter-by-drink-btn"
            type="image"
            src={ drinksLogo }
            alt="category-logo"
            onClick={ drinkFilter }
          />
          <span className="filter-name">Drink</span>
        </div>
      </div>
      <div className="cards-done-container">
        {localStorageCreate && renderCard()}
      </div>
      <div className="pre-footer" />
      <Footer />
    </div>
  );
}

export default DoneRecipes;
