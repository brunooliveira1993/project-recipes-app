import { React, useState, useEffect } from 'react';
import Header from '../components/Header';
import CardProfile from '../components/CardProfile';

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
    <div>
      <Header />
      <button
        onClick={ allFilter }
        type="button"
        data-testid="filter-by-all-btn"
      >
        All
      </button>
      <button
        onClick={ mealFilter }
        type="button"
        data-testid="filter-by-meal-btn"
      >
        Meal
      </button>
      <button
        onClick={ drinkFilter }
        type="button"
        data-testid="filter-by-drink-btn"
      >
        Drink
      </button>
      {localStorageCreate && renderCard()}
    </div>
  );
}

export default DoneRecipes;
