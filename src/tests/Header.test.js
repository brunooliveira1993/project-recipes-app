import React from 'react';
import { screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Verifica se o Header renderiza os itens na tela corretamente', () => {
  test('Se o título "Meals" é renderizado na tela', () => {
    renderWithRouter(<App />, { initialEntries: ['/meals'] });

    const mealsTitle = screen.getByRole('heading', { level: 1 });

    expect(mealsTitle).toBeInTheDocument();
  });

  //   test('Se contém um link profile que, ao clicar, redireciona para a página de profile', () => {
  //     const { history } = renderWithRouter(<App />);
  //     history.push('/meals');

  //     // const beefButton = screen.getByRole('button', { name: 'Beef' });

  //     // expect(beefButton).toBeInTheDocument();
  //   });

  //   test('Se contém um campo de pesquisa para digitar receitas e ingredientes', () => {
  //     const { history } = renderWithRouter(<App />);
  //     history.push('/meals');

  //     // const beefButton = screen.getByRole('button', { name: 'Beef' });

//     // expect(beefButton).toBeInTheDocument();
//   });
});
