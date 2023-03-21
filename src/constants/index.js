// Para alterar o nome de qualquer variavel, coloque o cursor em cima
// do nome da variavel e aperte F2

// API URLs
export const DRINKS_BASE_URL = 'https://www.thecocktaildb.com/api/json/v1/1/';
export const MEALS_BASE_URL = 'https://www.themealdb.com/api/json/v1/1/';

// API Endpoints
export const CATEGORY_CATALOG_ENDPOINT = 'list.php?c=list';
export const CATEGORY_RECIPES_ENDPOINT = 'filter.php?c=';
export const DEFAULT_ENDPOINT = 'search.php?s=';
export const FIRST_LETTER_ENDPOINT = 'search.php?f=';
export const INGREDIENT_ENDPOINT = 'filter.php?i=';
export const RECIPE_DETAILS_ENDPOINT = 'lookup.php?i=';

// Button names
export const ALL_BTN = 'All';
export const DONE_RECIPES_BTN = 'Done Recipes';
export const DRINKS_BTN = 'Drinks';
export const FAVORITE_RECIPES_BTN = 'Favorite Recipes';
export const FIRST_LETTER_BTN = 'First letter';
export const INGREDIENT_BTN = 'Ingredient';
export const NAME_BTN = 'Name';
export const LOGOUT_BTN = 'Logout';
export const MEALS_BTN = 'Meals';
export const SEARCH_BTN = 'Search';

// localStorage Keys
export const DONE_RECIPES_KEY = 'doneRecipes';
export const DRINKS_TOKEN_KEY = 'drinksToken';
export const FAVORITE_RECIPES_KEY = 'favoriteRecipes';
export const IN_PROGRESS_RECIPES_KEY = 'inProgressRecipes';
export const MEALS_TOKEN_KEY = 'mealsToken';
export const USER_KEY = 'user';

// Numbers
export const CATEGORIES_MAX_AMOUNT = 5;
export const DEFAULT_RECIPES_MAX_AMOUNT = 12;
export const PASSWORD_MIN_LENGTH = 6;
export const RECOMMENDATIONS_RECIPES_MAX_AMOUNT = 6;
export const CATEGORY_NEED_WRAP = 3;

// Path
export const DRINKS_PATH = '/drinks';
export const DONE_RECIPES_PATH = '/done-recipes';
export const FAVORITE_RECIPES_PATH = '/favorite-recipes';
export const IN_PROGRESS_PATH = '/in-progress';
export const MEALS_PATH = '/meals';
export const PROFILE_PATH = '/profile';

// regEx
export const EMAIL_REGEX = /\S+@\S+\.\S+/;

// Search type values
export const FIRST_LETTER_VALUE = 'firstLetter';
export const INGREDIENT_VALUE = 'ingredient';
export const NAME_VALUE = 'name';
