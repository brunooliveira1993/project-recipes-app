import { React, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import SearchBar from './SearchBar';
import searchIcon from '../images/searchIcon.svg';
import profileIcon from '../images/profileIcon.svg';

function Header() {
  const [actSearch, setActSearch] = useState(false);

  const { pathname } = useLocation();
  const headerName = pathname.replace('/', '').replace('-', ' ');
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
  return (
    <header>
      <h1 data-testid="page-title">{convertedName.join(' ')}</h1>
      {
        (pathname === '/meals' || pathname === '/drinks')
        && (
          <input
            data-testid="search-top-btn"
            type="image"
            src={ searchIcon }
            alt="Imagem de busca"
            onClick={ searchFunc }
          />
        )
      }
      {
        actSearch && <SearchBar />
      }
      <Link to="/profile">
        <img
          src={ profileIcon }
          alt="Imagem de perfil"
          data-testid="profile-top-btn"
        />
      </Link>
    </header>
  );
}

export default Header;
