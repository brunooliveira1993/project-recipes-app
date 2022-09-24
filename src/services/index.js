import { DRINKS_TOKEN, MEALS_TOKEN, USER } from '../constants';

export const saveDataToLocalStorageOnLogin = (email) => {
  localStorage.setItem(USER, JSON.stringify({ email }));
  localStorage.setItem(MEALS_TOKEN, 1);
  localStorage.setItem(DRINKS_TOKEN, 1);
};

export const placeholder = () => {};
