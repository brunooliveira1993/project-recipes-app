import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('testando componente Profile', () => {
  test('Test Profile e Logout', () => {
    const { history } = renderWithRouter(<App />);
    const email = screen.getByTestId('email-input');
    const password = screen.getByTestId('password-input');
    const button = screen.getByTestId('login-submit-btn');
    userEvent.type(email, 'teste@teste.com');
    userEvent.type(password, '1234567');
    expect(button).not.toBeDisabled();
    userEvent.click(button);
    expect(history.location.pathname).toBe('/meals');
    const profileButton = screen.getByTestId('profile-top-btn');
    userEvent.click(profileButton);
    expect(history.location.pathname).toBe('/profile');
    const emailRender = screen.getByTestId('profile-email');
    expect(emailRender).toBeInTheDocument();
    userEvent.click(profileButton);
    const logoutButton = screen.getByText('Logout');
    userEvent.click(logoutButton);
    expect(history.location.pathname).toBe('/');
    history.push('/profile');
    expect(emailRender).not.toBeInTheDocument();
  });
  test('Teste de Favorite Recipes', () => {
    const { history } = renderWithRouter(<App />, ['/profile']);
    const favoritieButton = screen.getByText('Favorite Recipes');
    userEvent.click(favoritieButton);
    expect(history.location.pathname).toBe('/favorite-recipes');
  });
  test('Test Done Recipes', () => {
    const { history } = renderWithRouter(<App />, ['/profile']);
    const doneButton = screen.getByText('Done Recipes');
    userEvent.click(doneButton);
    expect(history.location.pathname).toBe('/done-recipes');
  });
});
