import { React, useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CardFavorite from '../components/CardFavorite';
import './FavoriteRecipes.css';
import all from '../images/all.svg';
import drinksLogo from '../images/drinks.svg';
import mealsLogo from '../images/meals.svg';

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
    <div className="favorites-main-container">
      <Header />
      <div className="filter-fav-container">
        <div className="fav-filter">
          <input
            data-testid="filter-by-all-btn"
            type="image"
            src={ all }
            alt="category-logo"
            onClick={ allFilter }
          />
          <span className="filter-name">All</span>
        </div>
        <div className="fav-filter">
          <input
            data-testid="filter-by-meal-btn"
            type="image"
            src={ mealsLogo }
            alt="category-logo"
            onClick={ mealFilter }
          />
          <span className="filter-name">Meal</span>
        </div>
        <div className="fav-filter">
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
      <div className="cards-fav-container">
        {localStorageCreate && renderCard()}
      </div>
      <div className="pre-footer" />
      <Footer />
    </div>
  );
}

export default FavoriteRecipes;
