import {createStore, applyMiddleware, compose} from "redux";
import {browserHistory} from "react-router";
import {syncHistoryWithStore, routerMiddleware} from "react-router-redux";
import thunk from 'redux-thunk';
import freeze from "redux-freeze";
import {reducers} from "./reducers/index";

let middlewares = [];
middlewares.push(thunk);
middlewares.push(routerMiddleware(browserHistory));

if (process.env.NODE_ENV !== 'production') {
  middlewares.push(freeze);
}

let middleware = applyMiddleware(...middlewares);

if (process.env.NODE_ENV !== 'production' && window.devToolsExtension) {
  middleware = compose(middleware, window.devToolsExtension());
}

const store = createStore(reducers, middleware);
const history = syncHistoryWithStore(browserHistory, store);

export {store, history};
