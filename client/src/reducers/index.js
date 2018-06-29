import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import soundItemReducer from "./soundItemReducer";
import wordReducer from "./wordReducer";

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  soundItems: soundItemReducer,
  words: wordReducer
});
