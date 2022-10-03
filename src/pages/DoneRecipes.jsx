import { React, useState, useEffect } from 'react';
import Header from '../components/Header';
import CardProfile from '../components/CardProfile';

function DoneRecipes() {
  const [listDefault, setListDefault] = useState();
  const [renderItem, setRenderItem] = useState([]);
  const [localStorageCreate, setLocalStorageCreate] = useState(false);

  useEffect(() => {
    if (Object.keys(localStorage).includes('doneRecipes')) {
      const favorite = JSON.parse(localStorage.getItem('doneRecipes'));
      setLocalStorageCreate(true);
      setRenderItem(favorite);
      setListDefault(favorite);
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
