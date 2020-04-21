import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import authClientReducer from "./authClientReducer";
import errorClientReducer from "./errorReducer";

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  authClient: authClientReducer,
  errorsClient: errorClientReducer
}); 