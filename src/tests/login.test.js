import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../../src/renderWithRouter';

describe('Checks that the login screen renders correctly', () => {
  test('If the email, password and "Enter" button fields appear on the screen', () => {
    renderWithRouter(<App />);

    const inputEmail = screen.getByTestId('email-input');
    const inputPassword = screen.getByTestId('password-input');
    const enterButton = screen.getByText('Enter')

    expect(inputEmail).toBeInTheDocument();
    expect(inputPassword).toBeInTheDocument();
    expect(enterButton).toBeInTheDocument();
  });

  test('If the button is disabled only after the email and password fields are filled in correctly', () => {
    renderWithRouter(<App />);

    const inputEmail = screen.getByTestId('email-input');
    const inputPassword = screen.getByTestId('password-input');
    const enterButton = screen.getByText('Enter')

    userEvent.type(inputEmail, 'teste@teste.com');
    userEvent.type(inputPassword, '1234567');
    expect(enterButton).not.toBeDisabled();
  });

  test('If the page redirects to the recipe page', () => {
    renderWithRouter(<App />);

    const inputEmail = screen.getByTestId('email-input');
    const inputPassword = screen.getByTestId('password-input');
    const enterButton = screen.getByText('Enter')

    userEvent.type(inputEmail, 'teste@teste.com');
    userEvent.type(inputPassword, '1234567');
    expect(enterButton).not.toBeDisabled();

    userEvent.click(enterButton);

    const mealsTitle = screen.getByRole('heading', { level: 1 });

    expect(mealsTitle).toBeInTheDocument();
  });
})