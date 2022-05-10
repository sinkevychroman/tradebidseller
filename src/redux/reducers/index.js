//Class responsible for combining all the reducers
import { combineReducers } from "redux";
import * as loginReducer from "./LoginReducer/loginReducer";
import * as sellReducer from "./SellReducer/sellReducer";


const appReducer = combineReducers(
  Object.assign({}, loginReducer, sellReducer),
);

export default appReducer;
