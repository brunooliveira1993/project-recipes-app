import React, { useState } from 'react';
import PropTypes from 'prop-types';
import RecipesContext from './RecipesContext';
import { fetchRecipes } from '../services';

function Provider({ children }) {
  const [recipesData, setRecipesData] = useState([]);
  const [categories, setCategories] = useState([]);

  const getRecipesData = async (url) => {
    const response = await fetchRecipes(url);
    const data = Object.values(response)[0] || [];
    setRecipesData(data);
  };

  const getCategories = async (url) => {
    const response = await fetchRecipes(url);
    const data = Object.values(response)[0] || [];
    setCategories(data);
  };

  const contextValues = {
    recipesData,
    getRecipesData,
    categories,
    getCategories,
  };

  return (
    <RecipesContext.Provider value={ contextValues }>
      { children }
    </RecipesContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default Provider;
