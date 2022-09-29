import { React, useState, useEffect } from 'react';
import Header from '../components/Header';
import CardFavorite from '../components/CardFavorite';

function FavoriteRecipes() {
  const [listDefault, setListDefault] = useState();
  const [renderItem, setRenderItem] = useState([]);
  const [localStorageCreate, setLocalStorageCreate] = useState(false);

  useEffect(() => {
    if (Object.keys(localStorage).includes('favoriteRecipes')) {
      const favorite = JSON.parse(localStorage.getItem('favoriteRecipes'));
      setLocalStorageCreate(true);
      setRenderItem(favorite);
      setListDefault(favorite);
    }
  }, [localStorageCreate]);

  const udatePage = (state) => setLocalStorageCreate(state);

  const renderCard = () => {
    console.log(renderItem);
    return renderItem.map((item, index) => (
      <CardFavorite
        renderPage={ udatePage }
        key={ index }
        item={ item }
        index={ index }
      />
    ));
  };

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

export default FavoriteRecipes;
