import { DEFAULT_ENDPOINT, DRINKS_BASE_URL, DRINKS_INGREDIENT_ENDPOINT,
  FIRST_LETTER_VALUE, FIRST_LETTER_ENDPOINT, INGREDIENT_VALUE, MEALS_BASE_URL,
  MEALS_INGREDIENT_ENDPOINT, MEALS_PATH, NAME_VALUE, CATEGORY_RECIPES_ENDPOINT,
  CATEGORY_CATALOG_ENDPOINT, RECIPE_DETAILS_ENDPOINT } from '../constants';

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

export const handleCategoryRecipesApiUrl = (isMeal, category) => (isMeal
  ? `${MEALS_BASE_URL}${CATEGORY_RECIPES_ENDPOINT}${category}`
  : `${DRINKS_BASE_URL}${CATEGORY_RECIPES_ENDPOINT}${category}`);

export const handleCategoryCatalogApiUrl = (isMeal) => (isMeal
  ? `${MEALS_BASE_URL}${CATEGORY_CATALOG_ENDPOINT}`
  : `${DRINKS_BASE_URL}${CATEGORY_CATALOG_ENDPOINT}`);

export const handleRecipeDetailsApiUrl = (isMeal, id) => (isMeal
  ? `${MEALS_BASE_URL}${RECIPE_DETAILS_ENDPOINT}${id}`
  : `${DRINKS_BASE_URL}${RECIPE_DETAILS_ENDPOINT}${id}`);

// Render functions
// export const renderIngredientsAndMeasures = (recipeDetails) => Object.keys(recipeDetails)
//   .reduce((acc, curr, index) => (
//     (curr.includes(`strIngredient${index}`) && recipeDetails[`strIngredient${index}`])
//       ? [...acc,
//         <>
//           <span>{ `${recipeDetails[`strMeasure${index}`]}` }</span>
//           <span>{ `${recipeDetails[`strIngredient${index}`]}` }</span>
//         </>]
//       : acc
//   ), []);

export const renderIngredientsAndMeasures = (recipeDetails) => Object.keys(recipeDetails)
  .reduce((acc, cur) => {
    let index = 1;
    if (cur.includes(`strIngredient${index}`) && recipeDetails[`strIngredient${index}`]) {
      const newIngredient = (
        <>
          <span>{ `${recipeDetails[`strIngredient${index}`]}` }</span>
          <span>{ `${recipeDetails[`strMeasure${index}`]}` }</span>
        </>
      );
      index += 1;
      return [...acc, newIngredient];
    }
    return acc;
  }, []);
