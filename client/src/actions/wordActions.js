import {
  SET_STUDENTS,
  SET_CURRENT_STUDENT,
  SET_CURRENT_WORDS,
  SET_FILTERED_WORDS,
  SET_WORD_COUNTS
  // EDIT_WORD
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

export const addStudent = name => dispatch => {
  axios
    .post("/api/teachers/student", name)
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
      dispatch(setCurrentWords(currentWords.concat([res.data])));
    })
    .catch(err => console.log(err));
};

export const editWord = (wordData, currentWords) => dispatch => {
  axios
    .post(`/api/words/${wordData.id}`, wordData)
    .then(res => {
      let index = currentWords.findIndex(wrd => {
        return wrd._id === wordData.id;
      });

      let newCurrentWords = [...currentWords]
        .slice(0, index)
        .concat([res.data])
        .concat([...currentWords].slice(index + 1));
      dispatch(setCurrentWords(newCurrentWords));
    })
    .catch(err => console.log(err));
};

export const setCurrentWords = words => {
  return {
    type: SET_CURRENT_WORDS,
    currentWords: words
  };
};

export const resetCurrentWords = currentWords => dispatch => {
  dispatch({
    type: SET_CURRENT_WORDS,
    currentWords: currentWords
  });
};

export const setFilteredWords = words => dispatch => {
  dispatch({
    type: SET_FILTERED_WORDS,
    filteredWords: words
  });
};

export const getWordCounts = currentWords => dispatch => {
  const wordCounts = {};
  for (let word of currentWords) {
    if (wordCounts[word.soundItem]) {
      wordCounts[word.soundItem]++;
    } else {
      wordCounts[word.soundItem] = 1;
    }
  }
  dispatch(setWordCounts({ ...wordCounts }));
};

export const setWordCounts = wordCounts => {
  return {
    type: SET_WORD_COUNTS,
    wordCounts: wordCounts
  };
};

export const resetWordCounts = wordCounts => dispatch => {
  dispatch({
    type: SET_WORD_COUNTS,
    wordCounts: wordCounts
  });
};
