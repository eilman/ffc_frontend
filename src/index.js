import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from "react-router-dom";
import {Provider} from 'react-redux'
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
//import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import {logger} from 'redux-logger';
import orderReducer from './store/reducers/orderReducer';
import restaurantReducer from './store/reducers/restaurantReducer';
import userReducer from './store/reducers/userReducer';
import userListReducer from './store/reducers/userListReducer';
import Navbar from "./components/Navbar";
import "./App.css";
import Login from "./Auth/Login";
import App from "./App";

const middlewares = [];

if(process.env.NODE_ENV === 'development'){
  middlewares.push(logger);
}

middlewares.push(thunk);

/*
const composeEnhancers =
  process.env.NODE_ENV === 'development' ? window.__REDUX.DEVTOOLS_EXTENSION_COMPOSE__ : null || compose;
*/

  const rootReducer = combineReducers({
    user: userReducer,
    userList: userListReducer,
    orders: orderReducer,
    restaurants: restaurantReducer
  });

  // const store = createStore(rootReducer);
  // const store = createStore(rootReducer, composeEnhancers(applyMiddleware(...middlewares)));
  const store = createStore(rootReducer, compose(applyMiddleware(...middlewares)));

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);