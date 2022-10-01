import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import fetch from '../../cypress/mocks/fetch';
import renderWithRouter from '../renderWithRouter';

describe('Testa a página principal com receitas de comida', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch').mockImplementation(fetch);
  });

  it('a página inicial renderiza as opções de meals', async () => {
    const { history } = renderWithRouter(<App />, ['/meals']);
    const { location: { pathname } } = history;

    expect(pathname).toEqual('/meals');

    const beefButton = await screen.findByTestId('Beef-category-filter');
    expect(beefButton).toBeInTheDocument();

    const breakfastButton = await screen.findByRole('button', { name: 'Breakfast' });
    expect(breakfastButton).toBeInTheDocument();

    const chickenButton = await screen.findByRole('button', { name: 'Chicken' });
    expect(chickenButton).toBeInTheDocument();

    const dessertButton = await screen.findByRole('button', { name: 'Dessert' });
    expect(dessertButton).toBeInTheDocument();

    const goatButton = await screen.findByRole('button', { name: 'Goat' });
    expect(goatButton).toBeInTheDocument();

    const allButton = await screen.findByRole('button', { name: 'All' });
    expect(allButton).toBeInTheDocument();

    const mealsTitle = await screen.findByRole('heading', { name: 'Meals' });
    expect(mealsTitle).toBeInTheDocument();

    const allCards = await screen.findAllByTestId(/recipe-card/i); // Referencia de como usar uma callback para TextMatch https://testing-library.com/docs/queries/about/#textmatch
    expect(allCards).toHaveLength(12);

    expect(allCards[0]).toHaveProperty('textContent', 'Corba');
  });

  it('clicar no botão de categoria renderiza os cards adequados', async () => {
    renderWithRouter(<App />, ['/meals']);

    const beefButton = await screen.findByTestId('Beef-category-filter');
    userEvent.click(beefButton);

    const allCards = await screen.findAllByTestId(/recipe-card/i); // Referencia de como usar uma callback para TextMatch https://testing-library.com/docs/queries/about/#textmatch

    waitFor(() => {
      expect(allCards).toHaveLength(12);
      expect(allCards[0]).toHaveProperty('textContent', 'Beef and Mustard Pie');
    });

    userEvent.click(beefButton);

    const allCardsAfterFilterRemoval = await screen.findAllByTestId(/recipe-card/i); // Referencia de como usar uma callback para TextMatch https://testing-library.com/docs/queries/about/#textmatch

    waitFor(() => {
      expect(allCardsAfterFilterRemoval).toHaveLength(12);
      expect(allCardsAfterFilterRemoval[0]).toHaveProperty('textContent', 'Corba');
    });
  });

  it('clicar no botão All renderiza os cards padrão', async () => {
    renderWithRouter(<App />, ['/meals']);

    const beefButton = await screen.findByTestId('Chicken-category-filter');
    userEvent.click(beefButton);

    const allCards = await screen.findAllByTestId(/recipe-card/i); // Referencia de como usar uma callback para TextMatch https://testing-library.com/docs/queries/about/#textmatch

    waitFor(() => {
      expect(allCards).toHaveLength(12);
      expect(allCards[0]).toHaveProperty('textContent', 'Ayam Percik');
    });

    const allCategoriesButton = await screen.findByTestId(/All-category-filter/i); // Referencia de como usar uma callback para TextMatch https://testing-library.com/docs/queries/about/#textmatch
    userEvent.click(allCategoriesButton);

    waitFor(() => {
      expect(allCardsAfterFilterRemoval).toHaveLength(12);
      expect(allCardsAfterFilterRemoval[0]).toHaveProperty('textContent', 'Corba');
    });
  });
});

describe('Testa a página principal com receitas de bebidas', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch').mockImplementation(fetch);
  });

  it('a página inicial renderiza as opções de drinks', async () => {
    const { history } = renderWithRouter(<App />, ['/drinks']);
    const { location: { pathname } } = history;

    expect(pathname).toEqual('/drinks');

    const beefButton = await screen.findByTestId('Ordinary Drink-category-filter');
    expect(beefButton).toBeInTheDocument();

    const breakfastButton = await screen.findByRole('button', { name: 'Cocktail' });
    expect(breakfastButton).toBeInTheDocument();

    const chickenButton = await screen.findByRole('button', { name: 'Shake' });
    expect(chickenButton).toBeInTheDocument();

    const dessertButton = await screen.findByRole('button', { name: 'Other/Unknown' });
    expect(dessertButton).toBeInTheDocument();

    const goatButton = await screen.findByRole('button', { name: 'Cocoa' });
    expect(goatButton).toBeInTheDocument();

    const allButton = await screen.findByRole('button', { name: 'All' });
    expect(allButton).toBeInTheDocument();

    const mealsTitle = await screen.findByRole('heading', { name: 'Drinks' });
    expect(mealsTitle).toBeInTheDocument();

    const allCards = await screen.findAllByTestId(/recipe-card/i); // Referencia de como usar uma callback para TextMatch https://testing-library.com/docs/queries/about/#textmatch
    expect(allCards).toHaveLength(12);

    expect(allCards[0]).toHaveProperty('textContent', 'GG');
  });

  it('clicar no botão de categoria renderiza os cards adequados', async () => {
    renderWithRouter(<App />, ['/drinks']);

    const beefButton = await screen.findByTestId('Ordinary Drink-category-filter');
    userEvent.click(beefButton);

    const allCards = await screen.findAllByTestId(/recipe-card/i); // Referencia de como usar uma callback para TextMatch https://testing-library.com/docs/queries/about/#textmatch

    waitFor(() => {
      expect(allCards).toHaveLength(12);
      expect(allCards[0]).toHaveProperty('textContent', '3-Mile Long Island Iced Tea');
    });

    userEvent.click(beefButton);

    const allCardsAfterFilterRemoval = await screen.findAllByTestId(/recipe-card/i); // Referencia de como usar uma callback para TextMatch https://testing-library.com/docs/queries/about/#textmatch

    waitFor(() => {
      expect(allCardsAfterFilterRemoval).toHaveLength(12);
      expect(allCardsAfterFilterRemoval[0]).toHaveProperty('textContent', 'GG');
    });
  });

  it('clicar no botão All renderiza os cards padrão', async () => {
    renderWithRouter(<App />, ['/drinks']);

    const beefButton = await screen.findByTestId('Cocktail-category-filter');
    userEvent.click(beefButton);

    const allCards = await screen.findAllByTestId(/recipe-card/i); // Referencia de como usar uma callback para TextMatch https://testing-library.com/docs/queries/about/#textmatch

    waitFor(() => {
      expect(allCards).toHaveLength(12);
      expect(allCards[0]).toHaveProperty('textContent', '155 Belmont');
    });

    const allCategoriesButton = await screen.findByTestId(/All-category-filter/i); // Referencia de como usar uma callback para TextMatch https://testing-library.com/docs/queries/about/#textmatch
    userEvent.click(allCategoriesButton);

    waitFor(() => {
      expect(allCardsAfterFilterRemoval).toHaveLength(12);
      expect(allCardsAfterFilterRemoval[0]).toHaveProperty('textContent', 'GG');
    });
  });
});
