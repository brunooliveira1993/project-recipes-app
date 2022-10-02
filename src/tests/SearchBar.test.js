import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import fetch from '../../cypress/mocks/fetch';
import renderWithRouter from '../renderWithRouter';

const SEARCH_TOP_BTN = 'search-top-btn';
const SEARCH_INPUT = 'search-input';
const SEARCH_BTN = 'exec-search-btn';
const INGREDIENT_RADIO = 'ingredient-search-radio';
const NAME_RADIO = 'name-search-radio';
const FIRST_LETTER_RADIO = 'first-letter-search-radio';

describe('Testa a a barra de busca do header', () => {
  // beforeEach(() => {
  //   jest.spyOn(global, 'fetch').mockImplementation(fetch);
  // });

  it('a barra de busca contém todos os elementos', async () => {
    jest.spyOn(global, 'fetch').mockImplementation(fetch);

    renderWithRouter(<App />, ['/meals']);

    const searchTopButton = await screen.findByTestId(SEARCH_TOP_BTN);
    expect(searchTopButton).toBeInTheDocument();

    userEvent.click(searchTopButton);

    const searchInput = await screen.findByTestId(SEARCH_INPUT);
    expect(searchInput).toBeInTheDocument();

    const searchButton = await screen.findByTestId(SEARCH_BTN);
    expect(searchButton).toBeInTheDocument();

    const ingredientRadio = await screen.findByTestId(INGREDIENT_RADIO);
    expect(ingredientRadio).toBeInTheDocument();

    const nameRadio = await screen.findByTestId(NAME_RADIO);
    expect(nameRadio).toBeInTheDocument();

    const firstLetterRadio = await screen.findByTestId(FIRST_LETTER_RADIO);
    expect(firstLetterRadio).toBeInTheDocument();
  });

  it('a busca por ingrediente de comida mostra os resultados corretos', async () => {
    jest.spyOn(global, 'fetch').mockImplementation(fetch);

    renderWithRouter(<App />, ['/meals']);

    const searchTopButton = await screen.findByTestId(SEARCH_TOP_BTN);
    expect(searchTopButton).toBeInTheDocument();

    userEvent.click(searchTopButton);

    const ingredientRadio = await screen.findByTestId(INGREDIENT_RADIO);
    expect(ingredientRadio).toBeInTheDocument();

    userEvent.click(ingredientRadio);

    const searchInput = await screen.findByTestId(SEARCH_INPUT);
    expect(searchInput).toBeInTheDocument();

    userEvent.type(searchInput, 'Chicken');

    const searchButton = await screen.findByTestId(SEARCH_BTN);
    expect(searchButton).toBeInTheDocument();

    userEvent.click(searchButton);

    const allChickenRecipes = await screen.findAllByTestId(/recipe-card/i);

    expect(allChickenRecipes).toHaveLength(12);
  });

  it('a busca por primeira letra de comida funciona corretamente', async () => {
    jest.spyOn(global, 'fetch').mockImplementation(fetch);
    jest.spyOn(global, 'alert');

    renderWithRouter(<App />, ['/meals']);

    const searchTopButton = await screen.findByTestId(SEARCH_TOP_BTN);
    expect(searchTopButton).toBeInTheDocument();

    userEvent.click(searchTopButton);

    const firstLetterRadio = await screen.findByTestId(FIRST_LETTER_RADIO);
    expect(firstLetterRadio).toBeInTheDocument();

    userEvent.click(firstLetterRadio);

    const searchInput = await screen.findByTestId(SEARCH_INPUT);
    expect(searchInput).toBeInTheDocument();

    userEvent.type(searchInput, 'a');

    const searchButton = await screen.findByTestId(SEARCH_BTN);
    expect(searchButton).toBeInTheDocument();

    userEvent.click(searchButton);

    expect(global.alert).not.toHaveBeenCalled();

    userEvent.type(searchInput, 'a');

    userEvent.click(searchButton);

    expect(global.alert).toHaveBeenCalled();
  });

  it('a busca retornar nenhum resultado funciona corretamente', async () => {
    jest.spyOn(global, 'fetch').mockImplementation(fetch);
    jest.spyOn(global, 'alert');

    renderWithRouter(<App />, ['/meals']);

    const searchTopButton = await screen.findByTestId(SEARCH_TOP_BTN);
    expect(searchTopButton).toBeInTheDocument();

    userEvent.click(searchTopButton);

    const nameRadio = await screen.findByTestId(NAME_RADIO);
    // const ingredientRadio = await screen.findByTestId(INGREDIENT_RADIO);
    expect(nameRadio).toBeInTheDocument();

    userEvent.click(nameRadio);

    const searchInput = await screen.findByTestId(SEARCH_INPUT);
    expect(searchInput).toBeInTheDocument();

    userEvent.type(searchInput, 'xablau');

    const searchButton = await screen.findByTestId(SEARCH_BTN);
    expect(searchButton).toBeInTheDocument();

    userEvent.click(searchButton);

    waitFor(() => {
      expect(global.alert).toHaveBeenCalled();
    });
  });

  it('a busca retornar nenhum resultado funciona corretamente', async () => {
    jest.spyOn(global, 'fetch').mockImplementation(fetch);
    jest.spyOn(global, 'alert');

    const { history } = renderWithRouter(<App />, ['/meals']);

    const searchTopButton = await screen.findByTestId(SEARCH_TOP_BTN);
    expect(searchTopButton).toBeInTheDocument();

    userEvent.click(searchTopButton);

    const nameRadio = await screen.findByTestId(NAME_RADIO);
    expect(nameRadio).toBeInTheDocument();

    userEvent.click(nameRadio);

    const searchInput = await screen.findByTestId(SEARCH_INPUT);
    expect(searchInput).toBeInTheDocument();

    userEvent.type(searchInput, 'Arrabiata');

    const searchButton = await screen.findByTestId(SEARCH_BTN);
    expect(searchButton).toBeInTheDocument();

    userEvent.click(searchButton);

    waitFor(() => {
      const { location: { pathname } } = history;
      expect(pathname).toEqual('meals/52771');
    });
  });
});
