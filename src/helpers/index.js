import { DEFAULT_ENDPOINT, DRINKS_BASE_URL, RECIPE_DETAILS_ENDPOINT,
  FIRST_LETTER_VALUE, FIRST_LETTER_ENDPOINT, INGREDIENT_VALUE, MEALS_BASE_URL,
  INGREDIENT_ENDPOINT, MEALS_PATH, NAME_VALUE, CATEGORY_RECIPES_ENDPOINT,
  CATEGORY_CATALOG_ENDPOINT } from '../constants';
import { getDoneFromLocalStorage, getFavoriteFromLocalStorage,
  getInProgressFromLocalStorage } from '../services';

// Meals or Drinks verifier
export const isMealsOrDrinks = (pathname) => pathname.includes(MEALS_PATH);

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

export const handleRecipeDetailsApiUrl = (isMeal, id) => {
  if (!id || typeof id !== 'string') return;
  return isMeal
    ? `${MEALS_BASE_URL}${RECIPE_DETAILS_ENDPOINT}${id}`
    : `${DRINKS_BASE_URL}${RECIPE_DETAILS_ENDPOINT}${id}`;
};

// Local storage handlers
// Favorite
export const handleSaveFavorite = (isMeal, recipeDetails) => {
  const currentFavoriteRecipes = getFavoriteFromLocalStorage() || [];
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

export const handleRemoveFavorite = (id) => {
  const currentFavoriteRecipes = getFavoriteFromLocalStorage() || [];
  const updatedFavoriteRecipes = currentFavoriteRecipes
    .filter(({ id: favoriteId }) => favoriteId !== id);
  return updatedFavoriteRecipes;
};

// In progress
export const isRecipeInProgress = (isMeal, id) => {
  const currentRecipesInProgress = getInProgressFromLocalStorage() || {};
  const currentRecipeType = isMeal
    ? currentRecipesInProgress.meals
    : currentRecipesInProgress.drinks;
  if (currentRecipeType) {
    const isInProgress = Object.keys(currentRecipeType).includes(id);
    return isInProgress;
  }
  return false;
};

export const handleSaveOrRemoveInProgress = (isMeal, id, ingredients) => {
  const currentRecipesInProgress = getInProgressFromLocalStorage() || {};
  const typeKey = isMeal ? 'meals' : 'drinks';
  const recipesOfType = currentRecipesInProgress[typeKey] || {};
  if (ingredients.length) {
    const updatedRecipesInProgress = {
      ...currentRecipesInProgress,
      [typeKey]: {
        ...recipesOfType,
        [id]: ingredients,
      },
    };
    return updatedRecipesInProgress;
  }
  const { [id]: idToRemove, ...restOfRecipesOfType } = recipesOfType;
  const updatedRecipesInProgress = {
    ...currentRecipesInProgress,
    [typeKey]: {
      ...restOfRecipesOfType,
    },
  };
  return updatedRecipesInProgress;
};

export const getRecipeProgress = (isMeal, id) => {
  const currentRecipesInProgress = getInProgressFromLocalStorage() || {};
  const currentRecipeType = isMeal
    ? currentRecipesInProgress.meals
    : currentRecipesInProgress.drinks;
  if (currentRecipeType) {
    const recipeId = Object.keys(currentRecipeType)
      .filter((inProgressId) => inProgressId === id);
    return currentRecipeType[recipeId] || [];
  }
  return [];
};

export const isRecipeFinished = (recipeDetails, usedIngredients) => {
  const allIngredientsAmount = (Object.keys(recipeDetails) || [])
    .filter((ingredient) => ingredient.includes('strIngredient')
      && recipeDetails[ingredient]).length;
  const allUsedIngredientsAmount = usedIngredients.length;
  const areBothAmountsEqual = allIngredientsAmount === allUsedIngredientsAmount;
  return areBothAmountsEqual;
};

// Done
export const isRecipeDone = (id) => {
  const currentDoneRecipes = getDoneFromLocalStorage() || [];
  const isDone = currentDoneRecipes
    .some(({ id: doneId }) => doneId === id);
  return isDone;
};

export const handleAddDone = (isMeal, recipeDetails) => {
  const currentDoneRecipes = getDoneFromLocalStorage() || [];
  const newDoneRecipe = {
    id: isMeal ? recipeDetails.idMeal : recipeDetails.idDrink,
    type: isMeal ? 'meal' : 'drink',
    nationality: isMeal ? recipeDetails.strArea : '',
    category: recipeDetails.strCategory,
    alcoholicOrNot: isMeal ? '' : recipeDetails.strAlcoholic,
    name: isMeal ? recipeDetails.strMeal : recipeDetails.strDrink,
    image: isMeal ? recipeDetails.strMealThumb : recipeDetails.strDrinkThumb,
    doneDate: new Date().toLocaleDateString('pt-br'),
    tags: isMeal ? recipeDetails.strTags.split(',') : [],
  };
  console.log(newDoneRecipe);
  return [...currentDoneRecipes, newDoneRecipe];
};
