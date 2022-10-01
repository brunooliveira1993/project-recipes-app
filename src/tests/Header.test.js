import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

const SEARCH_TOP_BTN = 'search-top-btn';

describe('Checks if the Header renders the items on the screen correctly', () => {
  test('Whether the title "Meals" is rendered on the screen', () => {
    renderWithRouter(<App />, ['/meals']);

    const mealsTitle = screen.getByRole('heading', { level: 1, name: /Meals/i });

    expect(mealsTitle).toBeInTheDocument();
  });

  test('If it contains a profile link that, when clicked, redirects to the profile page', () => {
    const { history } = renderWithRouter(<App />, ['/meals']);

    const perfilLink = screen.getByAltText(/Imagem de perfil/i);
    expect(perfilLink).toBeInTheDocument();

    userEvent.click(perfilLink);

    const { pathname } = history.location;
    const profileTitle = screen.getByRole('heading', { level: 1, name: /Profile/i });
    expect(pathname).toBe('/profile');
    expect(profileTitle).toBeInTheDocument();
  });

  test('Whether it contains a search field to enter recipes and ingredients', () => {
    renderWithRouter(<App />, ['/meals']);

    const iconForSearch = screen.getByTestId(SEARCH_TOP_BTN);
    expect(iconForSearch).toBeInTheDocument();

    userEvent.click(iconForSearch);

    const ingredientInputRadio = screen.getByDisplayValue('ingredient');
    const nameInputRadio = screen.getByDisplayValue('name');
    const fisrtLetterInputRadio = screen.getByDisplayValue('firstLetter');
    expect(ingredientInputRadio).toBeInTheDocument();
    expect(nameInputRadio).toBeInTheDocument();
    expect(fisrtLetterInputRadio).toBeInTheDocument();
  });

  test('If, when clicking on the search icon, the search field renders on the screen', () => {
    renderWithRouter(<App />, ['/meals']);

    const iconForSearch = screen.getByTestId(SEARCH_TOP_BTN);
    expect(iconForSearch).toBeInTheDocument();

    userEvent.click(iconForSearch);

    const buttonSearch = screen.getByTestId('exec-search-btn');
    expect(buttonSearch).toBeInTheDocument();
  });

  test('If, when clicking on the search icon, the search field is hidden', () => {
    renderWithRouter(<App />, ['/meals']);

    const iconForSearch = screen.getByTestId(SEARCH_TOP_BTN);
    expect(iconForSearch).toBeInTheDocument();

    userEvent.click(iconForSearch);

    const buttonSearch = screen.getByTestId('exec-search-btn');
    expect(buttonSearch).toBeInTheDocument();

    userEvent.click(iconForSearch);
    expect(buttonSearch).not.toBeInTheDocument();
  });
});
