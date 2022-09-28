import { DRINKS_TOKEN_KEY, FAVORITE_RECIPES_KEY, MEALS_TOKEN_KEY,
  USER_KEY } from '../constants';

export const saveDataToLocalStorageOnLogin = (email) => {
  localStorage.setItem(USER_KEY, JSON.stringify({ email }));
  localStorage.setItem(MEALS_TOKEN_KEY, 1);
  localStorage.setItem(DRINKS_TOKEN_KEY, 1);
};

export const getEmailLocalStorage = () => JSON.parse(localStorage.getItem(USER_KEY));

export const removeEmailLocalStorage = () => {
  localStorage.removeItem(USER_KEY);
};

export const handleFavoritesLocalStorage = (favoriteRecipes) => {
  localStorage.setItem(FAVORITE_RECIPES_KEY, JSON.stringify(favoriteRecipes));
};

export const getFavoriteRecipesFromLocalStorage = () => JSON.parse(localStorage
  .getItem(FAVORITE_RECIPES_KEY));

export const fetchRecipes = async (url) => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    // console.log(error, url);
    return [];
  }
};
