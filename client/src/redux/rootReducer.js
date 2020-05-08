import { combineReducers } from "redux";
// import reducers
import { myProfileReducer } from "./get-my-profile/myProfileReducers";

export const rootReducer = combineReducers({
  myProfile: myProfileReducer,
});
