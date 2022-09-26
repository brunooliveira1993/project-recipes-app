import React from 'react';
import '../App.css';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <div data-testid="footer" className="footer">
      <Link to="/drinks">
        <button type="button">
          <img
            data-testid="drinks-bottom-btn"
            src="src/images/drinkIcon.svg"
            alt="icone de drinks"
          />
        </button>
      </Link>
      <Link to="/meals">
        <button type="button">
          <img
            data-testid="meals-bottom-btn"
            src="src/images/mealIcon.svg"
            alt="icone de comisa"
          />
        </button>
      </Link>
    </div>
  );
}

export default Footer;
