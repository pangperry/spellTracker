import {
  SET_STUDENTS,
  SET_CURRENT_STUDENT,
  SET_CURRENT_WORDS,
  SET_FILTERED_WORDS
} from "../actions/types";
import axios from "axios";

export const getStudents = () => dispatch => {
  axios
    .get("/api/teachers/students")
    .then(res => {
      dispatch(setStudents(res.data.students));
    })
    .catch(err => console.log("errors"));
};

export const setStudents = students => {
  return {
    type: SET_STUDENTS,
    students: students
  };
};

export const setCurrentStudent = student => dispatch => {
  dispatch({
    type: SET_CURRENT_STUDENT,
    currentStudent: student
  });
};

export const getCurrentWords = currentStudentId => dispatch => {
  axios
    .get(`/api/words/${currentStudentId}`)
    .then(res => {
      dispatch(setCurrentWords(res.data));
    })
    .catch(err => console.log(err));
};

export const addWord = (
  currentStudentId,
  currentSoundItemId,
  wordData,
  currentWords
) => dispatch => {
  axios
    .post(`/api/words/${currentStudentId}/${currentSoundItemId}`, wordData)
    .then(res => {
      console.log("currentWords:", currentWords);
      console.log("data returned", res.data);
      dispatch(setCurrentWords(currentWords.concat([res.data])));
      // getCurrentWords(currentStudentId);
    })
    .catch(err => console.log(err));
};

export const setCurrentWords = words => {
  return {
    type: SET_CURRENT_WORDS,
    currentWords: words
  };
};

export const setFilteredWords = words => dispatch => {
  dispatch({
    type: SET_FILTERED_WORDS,
    filteredWords: words
  });
};
