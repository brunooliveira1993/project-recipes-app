import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import fetch from '../../cypress/mocks/fetch';
import renderWithRouter from '../renderWithRouter';
import { DONE_RECIPES_PATH } from '../constants';

const TEST_MEAL_IN_PROGRESS_PATH = '/meals/52771/in-progress';
const TEST_DRINK_IN_PROGRESS_PATH = '/drinks/178319/in-progress';

describe('Testa a página de detalhes da receita', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch').mockImplementation(fetch);
  });
  // screen.logTestingPlaygroundURL();
  it('a página inicial renderiza as instruções da receita de sushi', async () => {
    const { history } = renderWithRouter(<App />, [TEST_MEAL_IN_PROGRESS_PATH]);
    const { location: { pathname } } = history;

    expect(pathname).toEqual(TEST_MEAL_IN_PROGRESS_PATH);

    const recipeTitle = await screen.findByRole('heading', { name: 'Spicy Arrabiata Penne', level: 1 });
    expect(recipeTitle).toBeInTheDocument();

    const categoryTitle = await screen.findByRole('heading', { name: 'Vegetarian', level: 3 });
    expect(categoryTitle).toBeInTheDocument();

    const allIngredientsCheckboxes = await screen.findAllByTestId(/ingredient-step/i); // Referencia de como usar uma callback para TextMatch https://testing-library.com/docs/queries/about/#textmatch
    expect(allIngredientsCheckboxes).toHaveLength(8);

    const video = await screen.findByTitle('Embedded youtube');
    expect(video).toBeInTheDocument();
    expect(video).toHaveProperty('src', 'https://www.youtube.com/embed/1IszT_guI08');

    const recipePhoto = await screen.findByRole('img', { name: 'recipe' });
    expect(recipePhoto).toBeInTheDocument();
    expect(recipePhoto.src).toContain('https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg');

    const allRecommendations = screen.queryAllByTestId(/recommendation-card/i);
    expect(allRecommendations).toHaveLength(0);

    const shareButton = await screen.findByTestId(/share-btn/i);
    expect(shareButton).toBeInTheDocument();

    const favoriteButton = await screen.findByTestId(/favorite-btn/i);
    expect(favoriteButton).toBeInTheDocument();
  });

  it('a página inicial renderiza as instruções da receita de Aquamarine', async () => {
    const { history } = renderWithRouter(<App />, [TEST_DRINK_IN_PROGRESS_PATH]);
    const { location: { pathname } } = history;

    expect(pathname).toEqual(TEST_DRINK_IN_PROGRESS_PATH);

    const recipeTitle = await screen.findByRole('heading', { name: 'Aquamarine', level: 1 });
    expect(recipeTitle).toBeInTheDocument();

    const categoryTitle = await screen.findByRole('heading', { name: 'CocktailAlcoholic', level: 3 });
    expect(categoryTitle).toBeInTheDocument();

    const allIngredientsCheckboxes = await screen.findAllByTestId(/ingredient-step/i); // Referencia de como usar uma callback para TextMatch https://testing-library.com/docs/queries/about/#textmatch
    expect(allIngredientsCheckboxes).toHaveLength(3);

    const recipePhoto = await screen.findByRole('img', { name: 'recipe' });
    expect(recipePhoto).toBeInTheDocument();
    expect(recipePhoto.src).toContain('https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg');

    const allRecommendations = screen.queryAllByTestId(/recommendation-card/i);
    expect(allRecommendations).toHaveLength(0);

    const shareButton = await screen.findByTestId(/share-btn/i);
    expect(shareButton).toBeInTheDocument();

    const favoriteButton = await screen.findByTestId(/favorite-btn/i);
    expect(favoriteButton).toBeInTheDocument();
  });

  it('o botão de favoritos funciona corretamente', async () => {
    renderWithRouter(<App />, [TEST_MEAL_IN_PROGRESS_PATH]);

    const favoriteButton = await screen.findByTestId(/favorite-btn/i);
    expect(favoriteButton).toBeInTheDocument();
    expect(favoriteButton.src).toMatch(/whiteHeartIcon/i);

    userEvent.click(favoriteButton);

    expect(favoriteButton.src).toMatch(/blackHeartIcon/i);

    userEvent.click(favoriteButton);

    expect(favoriteButton.src).toMatch(/whiteHeartIcon/i);

    userEvent.click(favoriteButton);

    expect(favoriteButton.src).toMatch(/blackHeartIcon/i);
  });

  it('se o botão de favoritos carrega corretamente caso a receita esteja favoritada', async () => {
    renderWithRouter(<App />, [TEST_MEAL_IN_PROGRESS_PATH]);

    const favoriteButton = await screen.findByTestId(/favorite-btn/i);
    expect(favoriteButton).toBeInTheDocument();
    expect(favoriteButton.src).toMatch(/blackHeartIcon/i);

    userEvent.click(favoriteButton);

    expect(favoriteButton.src).toMatch(/whiteHeartIcon/i);
  });

  it('se o botão de compartilhar funciona corretamente', async () => {
    Object.assign(navigator, {
      clipboard: {
        writeText: jest.fn(),
      },
    });
    jest.spyOn(navigator.clipboard, 'writeText');

    renderWithRouter(<App />, [TEST_MEAL_IN_PROGRESS_PATH]);

    const shareButton = await screen.findByTestId(/share-btn/i);
    expect(shareButton).toBeInTheDocument();

    userEvent.click(shareButton);

    const linkCopied = await screen.findByText('Link copied!');
    expect(linkCopied).toBeInTheDocument();
  });

  it('se os checkbox e o botão de finalizar funcionam corretamente', async () => {
    const { history } = renderWithRouter(<App />, [TEST_MEAL_IN_PROGRESS_PATH]);

    const allIngredientsCheckboxes = await screen.findAllByRole('checkbox'); // Referencia de como usar uma callback para TextMatch https://testing-library.com/docs/queries/about/#textmatch
    expect(allIngredientsCheckboxes).toHaveLength(8);

    const finishButton = await screen.findByTestId(/finish-recipe-btn/i); // Referencia de como usar uma callback para TextMatch https://testing-library.com/docs/queries/about/#textmatch
    expect(finishButton).toBeDisabled();

    userEvent.click(allIngredientsCheckboxes[0]);
    expect(allIngredientsCheckboxes[0]).toBeChecked();

    userEvent.click(allIngredientsCheckboxes[0]);
    expect(allIngredientsCheckboxes[0]).not.toBeChecked();

    allIngredientsCheckboxes.forEach((checkbox) => {
      userEvent.click(checkbox);
    });

    allIngredientsCheckboxes.forEach((checkbox) => {
      expect(checkbox).toBeChecked();
    });

    expect(finishButton).not.toBeDisabled();
    userEvent.click(finishButton);

    const { location: { pathname } } = history;

    expect(pathname).toEqual(DONE_RECIPES_PATH);
  });
});
