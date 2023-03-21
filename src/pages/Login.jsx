import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { EMAIL_REGEX, MEALS_PATH, PASSWORD_MIN_LENGTH } from '../constants';
import { saveDataToLocalStorageOnLogin } from '../services';
import './Login.css';

function Login() {
  const history = useHistory();
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');

  // Validation functions
  const validateLoginInputs = () => {
    const isEmailValid = EMAIL_REGEX.test(emailInput);
    const isPasswordValid = passwordInput.length > PASSWORD_MIN_LENGTH;
    const areAllInputsValid = isEmailValid && isPasswordValid;
    return !areAllInputsValid;
  };

  const isDisabled = validateLoginInputs();

  // Handling functions
  const handleEmailInput = ({ target: { value } }) => setEmailInput(value);

  const handlePasswordInputt = ({ target: { value } }) => setPasswordInput(value);

  const handleEnterButtonClick = (event) => {
    event.preventDefault();
    saveDataToLocalStorageOnLogin(emailInput);
    history.push(MEALS_PATH);
  };

  return (
    <div className="login-container">
      <form className="form" onSubmit={ handleEnterButtonClick }>
        <br />
        <br />
        <br />
        <input
          className="input"
          data-testid="email-input"
          type="email"
          placeholder="Email"
          name="emailInput"
          value={ emailInput }
          onChange={ handleEmailInput }
        />
        <input
          className="input"
          data-testid="password-input"
          type="password"
          placeholder="Password"
          name="passwordInput"
          value={ passwordInput }
          onChange={ handlePasswordInputt }
        />
        <button
          className="login-btn"
          data-testid="login-submit-btn"
          type="submit"
          disabled={ isDisabled }
        >
          Enter
        </button>
      </form>
    </div>
  );
}

export default Login;
