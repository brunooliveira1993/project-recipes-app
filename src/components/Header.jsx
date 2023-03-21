import { React, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import SearchBar from './SearchBar';
import searchIcon from '../images/searchIcon.svg';
import profile from '../images/profileIcon.svg';
import drinks from '../images/drinkIcon.svg';
import meals from '../images/mealIcon.svg';
import favorites from '../images/fav.svg';
import done from '../images/done.svg';
import './Header.css';
import logo from '../images/logo.png';

function Header() {
  const [actSearch, setActSearch] = useState(false);

  const { pathname } = useLocation();
  const headerName = pathname.replace('/', '').replace('-', ' ');
  console.log(headerName);
  const arr = headerName.split(' ');
  const convertedName = arr.map((str) => (str
    .replace(str[0], str[0].toUpperCase())));

  const searchFunc = () => {
    if (actSearch === true) {
      setActSearch(false);
    } else {
      setActSearch(true);
    }
  };

  const logoTitle = () => {
    switch (headerName) {
    case 'profile':
      return profile;
    case 'drinks':
      return drinks;
    case 'meals':
      return meals;
    case 'favorite recipes':
      return favorites;
    case 'done recipes':
      return done;
    default:
      break;
    }
  };

  return (
    <header className="header">
      <div className="main-header-top">
        <Link to="/meals">
          <img
            src={ logo }
            alt="logo"
            className="logo-img"
          />
        </Link>
        <div className="header-btn-container">
          {
            (pathname === '/meals' || pathname === '/drinks')
        && (
          <input
            className="search-icon"
            data-testid="search-top-btn"
            type="image"
            src={ searchIcon }
            alt="Imagem de busca"
            onClick={ searchFunc }
          />
        )
          }
          <Link to="/profile">
            <img
              className="profile-top-btn"
              src={ profile }
              alt="Imagem de perfil"
              data-testid="profile-top-btn"
            />
          </Link>
        </div>
      </div>
      <div className="title-container">
        <img src={ logoTitle() } alt="logo-title" />
        <h1
          className="page-title"
          data-testid="page-title"
        >
          {convertedName.join(' ')}
        </h1>
      </div>
      {
        actSearch && <SearchBar />
      }
    </header>
  );
}

export default Header;
