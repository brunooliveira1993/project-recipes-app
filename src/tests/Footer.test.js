import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Checks if Footer renders on-screen items correctly', () => {
  test('If it contains a link that, when clicked, reloads the page with drink options', () => {
    const { history } = renderWithRouter(<App />, ['/meals']);

    const linkDrinks = screen.getByTestId('drinks-bottom-btn');
    expect(linkDrinks).toBeInTheDocument();

    userEvent.click(linkDrinks);

    const { pathname } = history.location;
    expect(pathname).toBe('/drinks');
  });

  test('If it contains a link that, when clicked, reloads the page with meals options', () => {
    const { history } = renderWithRouter(<App />, ['/drinks']);

    const linkMeals = screen.getByTestId('meals-bottom-btn');
    expect(linkMeals).toBeInTheDocument();

    userEvent.click(linkMeals);

    const { pathname } = history.location;
    expect(pathname).toBe('/meals');
  });
});
