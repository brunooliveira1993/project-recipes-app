import { DEFAULT_ENDPOINT, DRINKS_BASE_URL, DRINKS_INGREDIENT_ENDPOINT,
  FIRST_LETTER_VALUE, FIRST_LETTER_ENDPOINT, INGREDIENT_VALUE, MEALS_BASE_URL,
  MEALS_INGREDIENT_ENDPOINT, MEALS_PATH, NAME_VALUE, CATEGORY_RECIPES_ENDPOINT,
  CATEGORY_CATALOG_ENDPOINT } from '../constants';

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
      ? `${MEALS_BASE_URL}${MEALS_INGREDIENT_ENDPOINT}${searchInput}`
      : `${DRINKS_BASE_URL}${DRINKS_INGREDIENT_ENDPOINT}${searchInput}`;
  }
  if (searchType === FIRST_LETTER_VALUE) {
    return isMeal
      ? `${MEALS_BASE_URL}${FIRST_LETTER_ENDPOINT}${searchInput}`
      : `${DRINKS_BASE_URL}${FIRST_LETTER_ENDPOINT}${searchInput}`;
  }
};

console.log(handleSearchApiUrl(true, INGREDIENT_VALUE, 'beef'));
console.log(handleSearchApiUrl(false, INGREDIENT_VALUE, 'vodka'));

export const handleCategoryRecipesApiUrl = (isMeal, category) => (isMeal
  ? `${MEALS_BASE_URL}${CATEGORY_RECIPES_ENDPOINT}${category}`
  : `${DRINKS_BASE_URL}${CATEGORY_RECIPES_ENDPOINT}${category}`);

export const handleCategoryCatalogApiUrl = (isMeal) => (isMeal
  ? `${MEALS_BASE_URL}${CATEGORY_CATALOG_ENDPOINT}`
  : `${DRINKS_BASE_URL}${CATEGORY_CATALOG_ENDPOINT}`);

console.log(handleCategoryCatalogApiUrl(true));
console.log(handleCategoryCatalogApiUrl(false));
