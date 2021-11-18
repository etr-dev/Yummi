import drawerReducer from "./drawerSelection";
import categoryReducer from "./categorySelection";
import { combineReducers } from "redux";

const allReducers = combineReducers({
  drawer: drawerReducer,
  category: categoryReducer,
});
export default allReducers;
