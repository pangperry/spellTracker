import {
  GET_SOUND_ITEMS_FROM_AUTH,
  SET_CURRENT_CATEGORY,
  SET_CURRENT_SUBCATEGORY
} from "./types";

export const setCurrentCategory = category => dispatch => {
  dispatch({
    type: SET_CURRENT_CATEGORY,
    category: category
  });
};

export const setCurrentSubcategory = subcategory => dispatch => {
  dispatch({
    type: SET_CURRENT_SUBCATEGORY,
    subcategory: subcategory
  });
};

// export const getSubcategories = category => dispatch => {
//   dispatch({
//     type: GET_SUBCATEGORIES,
//     category: category
//   });
// };
