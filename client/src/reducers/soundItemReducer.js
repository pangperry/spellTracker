import {
  SET_CURRENT_CATEGORY,
  SET_CURRENT_SUBCATEGORY,
  GET_CATEGORIES,
  GET_SUBCATEGORIES
} from "../actions/types";

const initialState = {
  currentSubcategory: null,
  currentCategory: "all"
};

export default function(state = initialState, action) {
  switch (action.type) {
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
