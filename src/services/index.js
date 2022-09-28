import { DONE_RECIPES_KEY, DRINKS_TOKEN_KEY, FAVORITE_RECIPES_KEY,
  IN_PROGRESS_RECIPES_KEY, MEALS_TOKEN_KEY, USER_KEY } from '../constants';

// Local storage Functions
// Login
export const saveDataToLocalStorageOnLogin = (email) => {
  localStorage.setItem(USER_KEY, JSON.stringify({ email }));
  localStorage.setItem(MEALS_TOKEN_KEY, 1);
  localStorage.setItem(DRINKS_TOKEN_KEY, 1);
};

// Email
export const getEmailLocalStorage = () => JSON.parse(localStorage.getItem(USER_KEY));

export const removeEmailLocalStorage = () => localStorage.clear();

// Favorites
export const handleFavoritesLocalStorage = (favoriteRecipes) => {
  localStorage.setItem(FAVORITE_RECIPES_KEY, JSON.stringify(favoriteRecipes));
};

export const getFavoriteFromLocalStorage = () => JSON.parse(localStorage
  .getItem(FAVORITE_RECIPES_KEY));

// In Progress
export const handleInProgressLocalStorage = (inProgressRecipes) => {
  localStorage.setItem(IN_PROGRESS_RECIPES_KEY, JSON.stringify(inProgressRecipes));
};

export const getInProgressFromLocalStorage = () => JSON.parse(localStorage
  .getItem(IN_PROGRESS_RECIPES_KEY));

// Done
export const handleDoneLocalStorage = (doneRecipes) => {
  localStorage.setItem(DONE_RECIPES_KEY, JSON.stringify(doneRecipes));
};

export const getDoneFromLocalStorage = () => JSON.parse(localStorage
  .getItem(DONE_RECIPES_KEY));

// Fetch Functions
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
