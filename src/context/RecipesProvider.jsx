import React, { useState } from 'react';
import PropTypes from 'prop-types';
import RecipesContext from './RecipesContext';
import { fetchRecipes } from '../services';
import { DATA_MAX_SIZE } from '../constants';

function Provider({ children }) {
  const [recipesList, setRecipesList] = useState([]);

  const getRecipesData = async (url) => {
    const response = await fetchRecipes(url);
    const data = Object.values(response)[0].slice(0, DATA_MAX_SIZE);
    setRecipesList(data);
  };

  const contextValues = {
    recipesList,
    getRecipesData,
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
