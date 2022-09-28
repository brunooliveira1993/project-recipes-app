import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

const EMAIL_INPUT = 'email-input';
const PASSWORD_INPUT = 'password-input';
const BUTTON_ENTER = 'Enter';

describe('Checks that the login screen renders correctly', () => {
  test('If the email, password and "Enter" button fields appear on the screen', () => {
    renderWithRouter(<App />);

    const inputEmail = screen.getByTestId(EMAIL_INPUT);
    const inputPassword = screen.getByTestId(PASSWORD_INPUT);
    const enterButton = screen.getByText(BUTTON_ENTER);

    expect(inputEmail).toBeInTheDocument();
    expect(inputPassword).toBeInTheDocument();
    expect(enterButton).toBeInTheDocument();
  });

  test('If the button is disabled only after the email and password fields are filled in correctly', () => {
    renderWithRouter(<App />);

    const inputEmail = screen.getByTestId(EMAIL_INPUT);
    const inputPassword = screen.getByTestId(PASSWORD_INPUT);
    const enterButton = screen.getByText(BUTTON_ENTER);

    userEvent.type(inputEmail, 'teste@teste.com');
    userEvent.type(inputPassword, '1234567');
    expect(enterButton).not.toBeDisabled();
  });

  test('If the page redirects to the recipe page', () => {
    renderWithRouter(<App />);

    const inputEmail = screen.getByTestId(EMAIL_INPUT);
    const inputPassword = screen.getByTestId(PASSWORD_INPUT);
    const enterButton = screen.getByText(BUTTON_ENTER);

    userEvent.type(inputEmail, 'teste@teste.com');
    userEvent.type(inputPassword, '1234567');
    expect(enterButton).not.toBeDisabled();

    userEvent.click(enterButton);

    const mealsTitle = screen.getByRole('heading', { level: 1 });

    expect(mealsTitle).toBeInTheDocument();
  });
});
