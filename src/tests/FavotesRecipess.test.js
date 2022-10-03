import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

const favoriteRecipes = [
  {
    id: '52771',
    type: 'meal',
    nationality: 'Italian',
    category: 'Vegetarian',
    alcoholicOrNot: '',
    name: 'Spicy Arrabiata Penne',
    image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
    doneDate: '23/06/2020',
    tags: ['Pasta', 'Curry'],
  },
  {
    id: '178319',
    type: 'drink',
    nationality: '',
    category: 'Cocktail',
    alcoholicOrNot: 'Alcoholic',
    name: 'Aquamarine',
    image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
    doneDate: '23/06/2020',
    tags: [],
  },
];

const PATH = '/favorite-recipes';
describe('Favorite recipes screen', () => {
  Object.assign(navigator, {
    clipboard: {
      writeText: () => {},
    },
  });
  jest.spyOn(navigator.clipboard, 'writeText');
  test('Teste de Done Recipes', () => {
    localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));
    const { history } = renderWithRouter(<App />, [PATH]);
    expect(history.location.pathname).toBe(PATH);
    const img = screen.getByTestId('0-horizontal-image');
    expect(img).toBeInTheDocument();
  });
  test('Teste de Copia', () => {
    localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));
    const { history } = renderWithRouter(<App />, [PATH]);
    expect(history.location.pathname).toBe(PATH);
    const shareButton = screen.getByTestId('0-horizontal-share-btn');
    expect(shareButton).toBeInTheDocument();
    userEvent.click(shareButton);
    const copyText = screen.getByText('Link copied!');
    expect(copyText).toBeInTheDocument();
  });
  test('Teste de Filtros', () => {
    const NAME = '0-horizontal-name';
    localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));
    const { history } = renderWithRouter(<App />, [PATH]);
    expect(history.location.pathname).toBe(PATH);
    const mealFilter = screen.getByTestId('filter-by-meal-btn');
    userEvent.click(mealFilter);
    const mealReturn = screen.getByTestId(NAME);
    expect(mealReturn).toString((favoriteRecipes[0].name));
    const drinkFilter = screen.getByTestId('filter-by-drink-btn');
    userEvent.click(drinkFilter);
    const drinkReturn = screen.getByTestId(NAME);
    expect(drinkReturn).toString((favoriteRecipes[1].name));
    const allFilter = screen.getByTestId('filter-by-all-btn');
    userEvent.click(mealFilter);
    userEvent.click(allFilter);
    const allReturn = screen.getByTestId(NAME);
    expect(allReturn).toString((favoriteRecipes[0].name));
  });
});
