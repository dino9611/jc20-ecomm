import { composeWithDevTools } from "@redux-devtools/extension";
import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import loadingReducers from "./loadingReducers";
import userReducer from "./userReducers";
// combine reducers gunanya untuk mengabungkan berbagai reducers jadi satu
//  dalam sebuah object
const reducers = combineReducers({
  user: userReducer,
  loading: loadingReducers,
});

const middlewares = [thunk];
// thunk berfungsi untuk menjalankan action secara asyncrounus
export const store = createStore(
  reducers,
  composeWithDevTools(applyMiddleware(...middlewares))
);
