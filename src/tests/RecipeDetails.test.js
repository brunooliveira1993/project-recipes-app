import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import fetch from '../../cypress/mocks/fetch';
import renderWithRouter from '../renderWithRouter';

describe('Testa a página de detalhes da receita de Sushi', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch').mockImplementation(fetch);
  });
  // screen.logTestingPlaygroundURL();
  it('a página inicial renderiza as opções de meals', async () => {
    const { history } = renderWithRouter(<App />, ['/meals/52771']);
    const { location: { pathname } } = history;

    expect(pathname).toEqual('/meals/52771');

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

  //   it('clicar no botão de categoria renderiza os cards adequados', async () => {
  //     renderWithRouter(<App />, ['/meals']);

  //     const beefButton = await screen.findByTestId('Beef-category-filter');
  //     userEvent.click(beefButton);

  //     const allCards = await screen.findAllByTestId(/recipe-card/i);

  //     waitFor(() => {
  //       expect(allCards).toHaveLength(12);
  //       expect(allCards[0]).toHaveProperty('textContent', 'Beef and Mustard Pie');
  //     });

  //     userEvent.click(beefButton);

  //     const allCardsAfterFilterRemoval = await screen.findAllByTestId(/recipe-card/i);

  //     waitFor(() => {
  //       expect(allCardsAfterFilterRemoval).toHaveLength(12);
  //       expect(allCardsAfterFilterRemoval[0]).toHaveProperty('textContent', 'Corba');
  //     });
  //   });

  //   it('clicar no botão All renderiza os cards padrão', async () => {
  //     renderWithRouter(<App />, ['/meals']);

  //     const beefButton = await screen.findByTestId('Chicken-category-filter');
  //     userEvent.click(beefButton);

  //     waitFor(() => {
  //       expect(allCards).toHaveLength(12);
  //       expect(allCards[0]).toHaveProperty('textContent', 'Ayam Percik');
  //     });

  //     userEvent.click(allCategoriesButton);

  //     waitFor(() => {
  //       expect(allCardsAfterFilterRemoval).toHaveLength(12);
  //       expect(allCardsAfterFilterRemoval[0]).toHaveProperty('textContent', 'Corba');
  //     });
  //   });
  // });

  // describe('Testa a página principal com receitas de bebidas', () => {
  //   beforeEach(() => {
  //     jest.spyOn(global, 'fetch').mockImplementation(fetch);
  //   });

  //   it('a página inicial renderiza as opções de drinks', async () => {
  //     const { history } = renderWithRouter(<App />, ['/drinks']);
  //     const { location: { pathname } } = history;

  //     expect(pathname).toEqual('/drinks');

  //     const beefButton = await screen.findByTestId('Ordinary Drink-category-filter');
  //     expect(beefButton).toBeInTheDocument();

  //     const breakfastButton = await screen.findByRole('button', { name: 'Cocktail' });
  //     expect(breakfastButton).toBeInTheDocument();

  //     const chickenButton = await screen.findByRole('button', { name: 'Shake' });
  //     expect(chickenButton).toBeInTheDocument();

  //     const dessertButton = await screen.findByRole('button', { name: 'Other/Unknown' });
  //     expect(dessertButton).toBeInTheDocument();

  //     const goatButton = await screen.findByRole('button', { name: 'Cocoa' });
  //     expect(goatButton).toBeInTheDocument();

  //     const allButton = await screen.findByRole('button', { name: 'All' });
  //     expect(allButton).toBeInTheDocument();

  //     const mealsTitle = await screen.findByRole('heading', { name: 'Drinks' });
  //     expect(mealsTitle).toBeInTheDocument();

  //     expect(allCards).toHaveLength(12);

  //     expect(allCards[0]).toHaveProperty('textContent', 'GG');
  //   });

  //   it('clicar no botão de categoria renderiza os cards adequados', async () => {
  //     renderWithRouter(<App />, ['/drinks']);

  //     const beefButton = await screen.findByTestId('Ordinary Drink-category-filter');
  //     userEvent.click(beefButton);

  //     waitFor(() => {
  //       expect(allCards).toHaveLength(12);
  //       expect(allCards[0]).toHaveProperty('textContent', '3-Mile Long Island Iced Tea');
  //     });

  //     userEvent.click(beefButton);

  //     waitFor(() => {
  //       expect(allCardsAfterFilterRemoval).toHaveLength(12);
  //       expect(allCardsAfterFilterRemoval[0]).toHaveProperty('textContent', 'GG');
  //     });
  //   });

  //   it('clicar no botão All renderiza os cards padrão', async () => {
  //     renderWithRouter(<App />, ['/drinks']);

  //     const beefButton = await screen.findByTestId('Cocktail-category-filter');
  //     userEvent.click(beefButton);

  //     waitFor(() => {
  //       expect(allCards).toHaveLength(12);
  //       expect(allCards[0]).toHaveProperty('textContent', '155 Belmont');
  //     });

  //     userEvent.click(allCategoriesButton);

//     waitFor(() => {
//       expect(allCardsAfterFilterRemoval).toHaveLength(12);
//       expect(allCardsAfterFilterRemoval[0]).toHaveProperty('textContent', 'GG');
//     });
//   });
});
