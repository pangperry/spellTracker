import { SET_STUDENTS, SET_CURRENT_STUDENT } from "../actions/types";
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
