import isEmpty from "lodash.isempty";

import { SET_CURRENT_USER } from "../actions/types";

const initialState = {
  isAuthenticated: false,
  teacher: {}
};

//Sets current user and navItems
export default function(state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        teacher: {
          id: action.payload.id,
          name: action.payload.name
        }
      };
    default:
      return state;
  }
}
