import React from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { DONE_RECIPES_BTN, DONE_RECIPES_PATH, FAVORITE_RECIPES_BTN,
  FAVORITE_RECIPES_PATH, LOGOUT_BTN } from '../constants';
import { getEmailLocalStorage, removeEmailLocalStorage } from '../services';

function Profile() {
  const history = useHistory();
  return (
    <div>
      <Header />
      <Footer />
      <p data-testid="profile-email">{() => getEmailLocalStorage}</p>
      <button
        type="button"
        data-testid="profile-done-btn"
        onClick={ () => history.push(DONE_RECIPES_PATH) }
      >
        {DONE_RECIPES_BTN}
      </button>
      <button
        type="button"
        data-testid="profile-favorite-btn"
        onClick={ () => history.push(FAVORITE_RECIPES_PATH) }
      >
        {FAVORITE_RECIPES_BTN}
      </button>
      <button
        type="button"
        data-testid="profile-logout-btn"
        onClick={ () => {
          removeEmailLocalStorage();
          history.push(FAVORITE_RECIPES_PATH);
        } }
      >
        {LOGOUT_BTN}
      </button>
    </div>
  );
}

export default Profile;
