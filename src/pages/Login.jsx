import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { saveDataToLocalStorageOnLogin } from '../services';

// const REGEX = /^[a-zA-Z0-9.]+@[A-Z0-9.-]+\.[A-Z]{2,}$/igm;
const REGEX = /\S+@\S+\.\S+/;
const MIN_PASSWORD_LENGTH = 6;

function Login() {
  const history = useHistory();
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');

  // Validation functions
  const validateLogin = () => {
    const isEmailValid = REGEX.test(emailInput);
    const isPasswordValid = passwordInput.length > MIN_PASSWORD_LENGTH;
    const areAllInputsValid = isEmailValid && isPasswordValid;
    return !areAllInputsValid;
  };

  const isDisabled = validateLogin();

  // Handling functions
  const handleEmailInput = ({ target: { value } }) => setEmailInput(value);

  const handlePasswordInputt = ({ target: { value } }) => setPasswordInput(value);

  const handleEnterButtonClick = () => {
    saveDataToLocalStorageOnLogin(emailInput);
    history.push('/meals');
  };

  return (
    <form onSubmit={ handleEnterButtonClick }>
      Login
      <input
        data-testid="email-input"
        type="email"
        placeholder="Email"
        name="emailInput"
        value={ emailInput }
        onChange={ handleEmailInput }
      />
      <input
        data-testid="password-input"
        type="password"
        placeholder="Password"
        name="passwordInput"
        value={ passwordInput }
        onChange={ handlePasswordInputt }
      />
      <button
        data-testid="login-submit-btn"
        type="submit"
        disabled={ isDisabled }
      >
        Enter
      </button>
    </form>
  );
}

export default Login;
