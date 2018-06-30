import {
  SET_STUDENTS,
  SET_CURRENT_STUDENT,
  SET_CURRENT_WORDS
} from "../actions/types";

const initialState = {
  students: ["Select Student"],
  currentStudent: null,
  currentWords: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_WORDS:
      return {
        ...state,
        currentWords: action.currentWords
      };
    case SET_CURRENT_STUDENT:
      return {
        ...state,
        currentStudent: action.currentStudent
      };
    case SET_STUDENTS:
      return {
        ...state,
        students: action.students
      };
    default:
      return state;
  }
}
