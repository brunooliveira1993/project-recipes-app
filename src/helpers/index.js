import { DEFAULT_ENDPOINT, DRINKS_BASE_URL, RECIPE_DETAILS_ENDPOINT,
  FIRST_LETTER_VALUE, FIRST_LETTER_ENDPOINT, INGREDIENT_VALUE, MEALS_BASE_URL,
  INGREDIENT_ENDPOINT, MEALS_PATH, NAME_VALUE, CATEGORY_RECIPES_ENDPOINT,
  CATEGORY_CATALOG_ENDPOINT } from '../constants';
import { getFavoriteRecipesFromLocalStorage } from '../services';

// Meals or Drinks verifier
export const verifyIfMealsOrDrinks = (pathname) => pathname.includes(MEALS_PATH);

// URL Handlers
export const handleDefaultApiUrl = (isMeal) => (isMeal
  ? `${MEALS_BASE_URL}${DEFAULT_ENDPOINT}`
  : `${DRINKS_BASE_URL}${DEFAULT_ENDPOINT}`);

export const handleSearchApiUrl = (isMeal, searchType, searchInput) => {
  if (searchType === NAME_VALUE) {
    return isMeal
      ? `${MEALS_BASE_URL}${DEFAULT_ENDPOINT}${searchInput}`
      : `${DRINKS_BASE_URL}${DEFAULT_ENDPOINT}${searchInput}`;
  }
  if (searchType === INGREDIENT_VALUE) {
    return isMeal
      ? `${MEALS_BASE_URL}${INGREDIENT_ENDPOINT}${searchInput}`
      : `${DRINKS_BASE_URL}${INGREDIENT_ENDPOINT}${searchInput}`;
  }
  if (searchType === FIRST_LETTER_VALUE) {
    return isMeal
      ? `${MEALS_BASE_URL}${FIRST_LETTER_ENDPOINT}${searchInput}`
      : `${DRINKS_BASE_URL}${FIRST_LETTER_ENDPOINT}${searchInput}`;
  }
};

export const handleCategoryRecipesApiUrl = (isMeal, category) => (isMeal
  ? `${MEALS_BASE_URL}${CATEGORY_RECIPES_ENDPOINT}${category}`
  : `${DRINKS_BASE_URL}${CATEGORY_RECIPES_ENDPOINT}${category}`);

export const handleCategoryCatalogApiUrl = (isMeal) => (isMeal
  ? `${MEALS_BASE_URL}${CATEGORY_CATALOG_ENDPOINT}`
  : `${DRINKS_BASE_URL}${CATEGORY_CATALOG_ENDPOINT}`);

export const handleRecipeDetailsApiUrl = (isMeal, id) => (isMeal
  ? `${MEALS_BASE_URL}${RECIPE_DETAILS_ENDPOINT}${id}`
  : `${DRINKS_BASE_URL}${RECIPE_DETAILS_ENDPOINT}${id}`);

// Handling functions
export const handleSaveFavoriteDataStructure = (isMeal, recipeDetails) => {
  const currentFavoriteRecipes = getFavoriteRecipesFromLocalStorage() || [];
  const newFavoriteRecipe = {
    id: isMeal ? recipeDetails.idMeal : recipeDetails.idDrink,
    type: isMeal ? 'meal' : 'drink',
    nationality: isMeal ? recipeDetails.strArea : '',
    category: recipeDetails.strCategory,
    alcoholicOrNot: isMeal ? '' : recipeDetails.strAlcoholic,
    name: isMeal ? recipeDetails.strMeal : recipeDetails.strDrink,
    image: isMeal ? recipeDetails.strMealThumb : recipeDetails.strDrinkThumb,
  };
  return [...currentFavoriteRecipes, newFavoriteRecipe];
};

export const handleRemoveFavoriteDataStructure = (id) => {
  const currentFavoriteRecipes = getFavoriteRecipesFromLocalStorage() || [];
  const updatedFavoriteRecipes = currentFavoriteRecipes
    .filter(({ id: favoriteId }) => favoriteId !== id);
  return updatedFavoriteRecipes;
};
