import dateReducer from "./dateSelection";
import drawerReducer from "./drawerSelection";
import { combineReducers } from "redux";

const allReducers = combineReducers({
  date: dateReducer,
  drawer: drawerReducer
});
export default allReducers;
