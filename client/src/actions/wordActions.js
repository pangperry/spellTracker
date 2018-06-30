import {
  SET_STUDENTS,
  SET_CURRENT_STUDENT,
  SET_CURRENT_WORDS
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
  console.log(currentStudentId);
  axios
    .get(`/api/words/${currentStudentId}`)
    .then(res => {
      console.log("yo");
      dispatch(setCurrentWords(res.data));
    })
    .catch(err => console.log(err));
};

export const setCurrentWords = words => {
  return {
    type: SET_CURRENT_WORDS,
    currentWords: words
  };
};
