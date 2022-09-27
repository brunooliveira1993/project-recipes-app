import { DRINKS_TOKEN_KEY, MEALS_TOKEN_KEY, USER_KEY } from '../constants';

export const saveDataToLocalStorageOnLogin = (email) => {
  localStorage.setItem(USER_KEY, JSON.stringify({ email }));
  localStorage.setItem(MEALS_TOKEN_KEY, 1);
  localStorage.setItem(DRINKS_TOKEN_KEY, 1);
};

export const getEmailLocalStorage = () => JSON.parse(localStorage.getItem(USER_KEY));

export const removeEmailLocalStorage = () => localStorage.clear();

export const fetchRecipes = async (url) => {
  const response = await fetch(url);
  const data = await response.json();
  return data;
};
