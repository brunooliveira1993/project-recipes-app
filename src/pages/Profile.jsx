import { React, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import {
  DONE_RECIPES_BTN, DONE_RECIPES_PATH, FAVORITE_RECIPES_BTN,
  FAVORITE_RECIPES_PATH, LOGOUT_BTN,
} from '../constants';
import { removeEmailLocalStorage } from '../services';
import './Profile.css';
import done from '../images/done.svg';
import fav from '../images/fav.svg';
import logout from '../images/logout.svg';

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
    <div className="main-profile-container">
      <Header />
      <Footer />
      <div className="profile-container">
        {
          createUser && (
            <h3 data-testid="profile-email">{userName}</h3>
          )
        }
        <label htmlFor="done-logo" className="btn-profile">
          <input
            id="done-logo"
            type="image"
            src={ done }
            alt="done-logo"
            data-testid="profile-done-btn"
            onClick={ () => history.push(DONE_RECIPES_PATH) }
          />
          <span className="btn-title">{DONE_RECIPES_BTN}</span>
        </label>
        <label htmlFor="fav-logo" className="btn-profile" id="fav-logo-container">
          <input
            id="fav-logo"
            type="image"
            src={ fav }
            alt="fav-logo"
            data-testid="profile-favorite-btn"
            onClick={ () => history.push(FAVORITE_RECIPES_PATH) }
          />
          <span className="btn-title">{FAVORITE_RECIPES_BTN}</span>
        </label>
        <label htmlFor="logout-logo" className="btn-profile">
          <input
            id="logout-logo"
            type="image"
            src={ logout }
            alt="logout-logo"
            data-testid="profile-logout-btn"
            onClick={ () => {
              removeEmailLocalStorage();
              history.push('/');
            } }
          />
          <span className="btn-title">{LOGOUT_BTN}</span>
        </label>
      </div>
    </div>
  );
}

export default Profile;
