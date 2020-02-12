import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { ThemeProvider } from '@chakra-ui/core'
import { Router } from 'react-router-dom'
import history from './history'
import {render} from 'react-dom';
import {StripeProvider} from 'react-stripe-elements';
import allReducers from './reducers';
// webPack will automatically look for the index.js file in
// the reducers folder
import { Provider } from 'react-redux'

const composeEnhancers =
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?   
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
    }) : compose;

const enhancer = composeEnhancers(
  applyMiddleware(thunk),
  // other store enhancers if any
);
const store = createStore(allReducers, enhancer);

// , window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()




ReactDOM.render(

    <ThemeProvider>
      <Provider store={store}>
          <Router history={history}>
        <StripeProvider apiKey="pk_test_TYooMQauvdEDq54NiTphI7jx" >
            <App />
          </StripeProvider>
          </Router>
      </Provider>
    </ThemeProvider>
   
   
    , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
