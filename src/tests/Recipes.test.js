import React from 'react';
// import { screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Verifica se a página inicial de receitas renderiza na tela corretamente', () => {
  test('Se a página inicial renderiza as opções de meals', () => {
    renderWithRouter(<App />, { initialEntries: ['/meals'] });

    // const beefButton = screen.getByTestId('Beef-category-filter');
    // const breakfastButton = screen.getByTestId('button', { name: 'Breakfast' });
    // const chickenButton = screen.getByTestId('button', { name: 'Chicken' });
    // const dessertButton = screen.getByTestId('button', { name: 'Dessert' });
    // const goatButton = screen.getByTestId('button', { name: 'Goat' });
    // const allButton = screen.getByTestId('button', { name: 'All' });

    // expect(beefButton).toBeInTheDocument();
    // expect(breakfastButton).toBeInTheDocument();
    // expect(chickenButton).toBeInTheDocument();
    // expect(dessertButton).toBeInTheDocument();
    // expect(goatButton).toBeInTheDocument();
    // expect(allButton).toBeInTheDocument();
  });
});
