import {combineReducers} from "redux";
import {routerReducer} from "react-router-redux";
import {servicesReducer} from "./services.reducer";
import {loadingReducer} from "./loading.reducer";

export const reducers = combineReducers({
  routing: routerReducer,
  services: servicesReducer,
  loading: loadingReducer
});
