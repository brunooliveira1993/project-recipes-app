import React from 'react';
import '../App.css';
import { Link } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import './Footer.css';

function Footer() {
  return (
    <div data-testid="footer" className="footer">
      <Link to="/meals">
        <img
          data-testid="meals-bottom-btn"
          src={ mealIcon }
          alt="icone de comida"
        />
      </Link>
      <Link to="/drinks">
        <img
          data-testid="drinks-bottom-btn"
          src={ drinkIcon }
          alt="icone de drinks"
        />
      </Link>
    </div>
  );
}

export default Footer;
