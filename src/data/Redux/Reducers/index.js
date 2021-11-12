import dateReducer from "./dateSelection";
import drawerReducer from "./drawerSelection";
import categoryReducer from "./categorySelection";
import { combineReducers } from "redux";

const allReducers = combineReducers({
  date: dateReducer,
  drawer: drawerReducer,
  category: categoryReducer,
});
export default allReducers;
