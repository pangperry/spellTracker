import axios from "axios";

import {
  // GET_SOUND_ITEMS_FROM_AUTH,
  SET_CURRENT_CATEGORY,
  SET_CURRENT_SUBCATEGORY,
  SET_SOUND_ITEMS,
  SET_CURRENT_SOUND_ITEM,
  SET_CATEGORY_NAMES,
  SET_SELECTOR
} from "./types";

export const initSoundItems = () => dispatch => {
  axios
    .get("/api/teachers/current/sounditems")
    .then(res => {
      dispatch(setSoundItems(res.data));
      console.log("hi");
    })
    .catch(err => console.log(err));
};

export const setSoundItems = soundItems => {
  return {
    type: SET_SOUND_ITEMS,
    soundItems: soundItems
  };
};

export const setCurrentSoundItem = currentSoundItem => dispatch => {
  dispatch({
    type: SET_CURRENT_SOUND_ITEM,
    currentSoundItem: currentSoundItem
  });
};

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

export const getCategoryNames = soundItems => dispatch => {
  let categoryNames;
  const temp = new Set();
  for (let item of soundItems) {
    temp.add(item.category);
  }
  categoryNames = [...temp];
  categoryNames.unshift("all");
  dispatch({
    type: SET_CATEGORY_NAMES,
    categoryNames: categoryNames
  });
};

//must access soundItems
//the selector will allow me to generate subcategories based on category input
export const initSelector = soundItems => dispatch => {
  let selector = {};
  for (let item of soundItems) {
    if (!selector[item.category]) {
      selector[item.category] = new Set();
    } else {
      selector[item.category].add(item.subcategory);
    }
  }
  for (let cat in selector) {
    selector[cat] = [...selector[cat]];
  }
  dispatch({
    type: SET_SELECTOR,
    selector: selector
  });
};
