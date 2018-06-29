import {
  SET_CURRENT_CATEGORY,
  SET_CURRENT_SUBCATEGORY,
  GET_CATEGORIES,
  GET_SUBCATEGORIES,
  SET_SOUND_ITEMS,
  SET_CATEGORY_NAMES,
  SET_SELECTOR
} from "../actions/types";

const initialState = {
  categoryNames: ["loading"],
  soundItems: [{ category: "loading", subcategory: "loading" }],
  currentSubcategory: null,
  currentCategory: "all"
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_SELECTOR:
      return {
        ...state,
        selector: action.selector
      };
    case SET_CATEGORY_NAMES:
      return {
        ...state,
        categoryNames: action.categoryNames
      };
      return {
        ...state,
        soundItems: action.soundItems
      };
    case SET_SOUND_ITEMS:
      return {
        ...state,
        soundItems: action.soundItems
      };
    case SET_CURRENT_SUBCATEGORY:
      return {
        ...state,
        currentSubcategory: action.subcategory
        // subcategorySelected: true
      };
    case SET_CURRENT_CATEGORY:
      return {
        ...state,
        currentCategory: action.category,
        // subcategorySelected: false,
        currentSubcategory: null
      };
    default:
      return state;
  }
}
