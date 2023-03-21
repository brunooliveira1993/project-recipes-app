import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import fetch from '../../cypress/mocks/fetch';
import renderWithRouter from '../renderWithRouter';
import { IN_PROGRESS_PATH, IN_PROGRESS_RECIPES_KEY } from '../constants';

const TEST_MEAL_PATH = '/meals/52771';
const TEST_DRINK_PATH = '/drinks/178319';

describe('Testa a página de detalhes da receita', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch').mockImplementation(fetch);
  });
  // screen.logTestingPlaygroundURL();
  it('a página inicial renderiza os detalhes da receita de sushi', async () => {
    const { history } = renderWithRouter(<App />, [TEST_MEAL_PATH]);
    const { location: { pathname } } = history;

    expect(pathname).toEqual(TEST_MEAL_PATH);

    const recipeTitle = await screen.findByRole('heading', { name: 'Spicy Arrabiata Penne', level: 1 });
    expect(recipeTitle).toBeInTheDocument();

    const categoryTitle = await screen.findByRole('heading', { name: 'Vegetarian', level: 3 });
    expect(categoryTitle).toBeInTheDocument();

    const ingredientsTitle = await screen.findByRole('heading', { name: 'Ingredients', level: 2 });
    expect(ingredientsTitle).toBeInTheDocument();

    const allIngredients = await screen.findAllByTestId(/ingredient-name-and-measure/i); // Referencia de como usar uma callback para TextMatch https://testing-library.com/docs/queries/about/#textmatch
    expect(allIngredients).toHaveLength(8);

    const instructionsTitle = await screen.findByRole('heading', { name: 'Instructions', level: 2 });
    expect(instructionsTitle).toBeInTheDocument();

    // const instructionsText = await screen.findByTestId('instructions');
    // expect(instructionsText).toBeInTheDocument();

    const videoTitle = await screen.findByRole('heading', { name: 'Video', level: 2 });
    expect(videoTitle).toBeInTheDocument();

    const video = await screen.findByTitle('Embedded youtube');
    expect(video).toBeInTheDocument();
    expect(video).toHaveProperty('src', 'https://www.youtube.com/embed/1IszT_guI08');

    const recipePhoto = await screen.findByRole('img', { name: 'recipe' });
    expect(recipePhoto).toBeInTheDocument();
    expect(recipePhoto.src).toContain('https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg');

    const allRecommendations = await screen.findAllByTestId(/recommendation-card/i);
    expect(allRecommendations).toHaveLength(6);

    const shareButton = await screen.findByTestId(/share-btn/i);
    expect(shareButton).toBeInTheDocument();

    const favoriteButton = await screen.findByTestId(/favorite-btn/i);
    expect(favoriteButton).toBeInTheDocument();
  });

  it('a página inicial renderiza os detalhes da receita de aquamarine', async () => {
    const { history } = renderWithRouter(<App />, [TEST_DRINK_PATH]);
    const { location: { pathname } } = history;

    expect(pathname).toEqual(TEST_DRINK_PATH);

    const recipeTitle = await screen.findByRole('heading', { name: 'Aquamarine', level: 1 });
    expect(recipeTitle).toBeInTheDocument();

    const categoryTitle = await screen.findByRole('heading', { name: 'CocktailAlcoholic', level: 3 });
    expect(categoryTitle).toBeInTheDocument();

    const ingredientsTitle = await screen.findByRole('heading', { name: 'Ingredients', level: 2 });
    expect(ingredientsTitle).toBeInTheDocument();

    const allIngredients = await screen.findAllByTestId(/ingredient-name-and-measure/i); // Referencia de como usar uma callback para TextMatch https://testing-library.com/docs/queries/about/#textmatch
    expect(allIngredients).toHaveLength(3);

    const instructionsTitle = await screen.findByRole('heading', { name: 'Instructions', level: 2 });
    expect(instructionsTitle).toBeInTheDocument();

    const videoTitle = screen.queryByTestId('heading', { name: 'Video', level: 2 });
    expect(videoTitle).not.toBeInTheDocument();

    const recipePhoto = await screen.findByRole('img', { name: 'recipe' });
    expect(recipePhoto).toBeInTheDocument();
    expect(recipePhoto.src).toContain('https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg');

    const allRecommendations = await screen.findAllByTestId(/recommendation-card/i);
    expect(allRecommendations).toHaveLength(6);

    const shareButton = await screen.findByTestId(/share-btn/i);
    expect(shareButton).toBeInTheDocument();

    const favoriteButton = await screen.findByTestId(/favorite-btn/i);
    expect(favoriteButton).toBeInTheDocument();
  });

  it('o botão de favoritos funciona corretamente', async () => {
    renderWithRouter(<App />, [TEST_MEAL_PATH]);

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
    renderWithRouter(<App />, [TEST_MEAL_PATH]);

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

    renderWithRouter(<App />, [TEST_MEAL_PATH]);

    const shareButton = await screen.findByTestId(/share-btn/i);
    expect(shareButton).toBeInTheDocument();

    userEvent.click(shareButton);

    const linkCopied = await screen.findByText('Link copied!');
    expect(linkCopied).toBeInTheDocument();
  });

  it('se o botão de continuar uma receita funciona corretamente', async () => {
    global.localStorage.setItem(IN_PROGRESS_RECIPES_KEY, JSON.stringify({
      meals: {
        52771: ['1', '2'],
      },
    }));

    const { history } = renderWithRouter(<App />, [TEST_MEAL_PATH]);

    const startRecipeButton = await screen.findByTestId(/start-recipe-btn/i);
    expect(startRecipeButton).toBeInTheDocument();
    expect(startRecipeButton).toHaveTextContent('Continue Recipe');

    userEvent.click(startRecipeButton);

    const { location: { pathname } } = history;
    expect(pathname).toEqual(`${TEST_MEAL_PATH}${IN_PROGRESS_PATH}`);
  });
});
