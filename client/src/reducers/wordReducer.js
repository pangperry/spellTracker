import {
  SET_STUDENTS,
  SET_CURRENT_STUDENT,
  SET_CURRENT_WORDS,
  SET_FILTERED_WORDS,
  SET_WORD_COUNTS,
  SET_NEEDSWORK_COUNTS
} from "../actions/types";

const initialState = {
  students: ["Select Student"],
  currentStudent: null,
  currentWords: [],
  filteredWords: [],
  wordCounts: {},
  needsWorkCounts: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_WORD_COUNTS:
      return {
        ...state,
        wordCounts: action.wordCounts
      };
    case SET_NEEDSWORK_COUNTS:
      return {
        ...state,
        needsWorkCounts: action.needsWorkCounts
      };
    case SET_FILTERED_WORDS:
      return {
        ...state,
        filteredWords: action.filteredWords
      };
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
