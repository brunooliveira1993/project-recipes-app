import { React, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import {
  DONE_RECIPES_BTN, DONE_RECIPES_PATH, FAVORITE_RECIPES_BTN,
  FAVORITE_RECIPES_PATH, LOGOUT_BTN,
} from '../constants';
import { removeEmailLocalStorage } from '../services';

function Profile() {
  const history = useHistory();
  const [createUser, setCreateUser] = useState(false);
  const [userName, setUserName] = useState('');
  const readUser = () => {
    if (Object.keys(localStorage).includes('user')) {
      return JSON.parse(localStorage.getItem('user'));
    }
    const saveUser = (user) => localStorage.setItem('user', JSON.stringify(user));
    saveUser('');
    return JSON.parse(localStorage.getItem('user'));
  };

  useEffect(() => {
    const user = readUser();
    if (user !== '') {
      setCreateUser(true);
      setUserName(user.email);
    }
  }, []);

  return (
    <div>
      <Header />
      <Footer />
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
          history.push('/');
        } }
      >
        {LOGOUT_BTN}
      </button>
      <br />
      {
        createUser && (
          <h3 data-testid="profile-email">{userName}</h3>
        )
      }
    </div>
  );
}

export default Profile;
