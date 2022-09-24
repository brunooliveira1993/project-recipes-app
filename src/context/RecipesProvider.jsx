import React, { useState } from 'react';
import PropTypes from 'prop-types';
import RecipesContext from './RecipesContext';

function Provider({ children }) {
  const [placeholder, setPlaceholder] = useState([]);

  const contextValues = {
    placeholder,
    setPlaceholder,
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
