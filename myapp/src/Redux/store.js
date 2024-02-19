import { configureStore } from "@reduxjs/toolkit";
import counterReducer, { reset } from "./Reducers/counterSlice";
import { setupListeners } from "@reduxjs/toolkit/query";
import { pokemonApi } from "./Reducers/PokemonQuery";
// import { logger } from "redux-logger";
import thunk from "redux-thunk";
import { batchedSubscribe } from "redux-batched-subscribe";
import _ from "lodash"; 
import todoSlice from "./Reducers/todoSlice";
//  custom middleware
const middleware1 = (store) => (next) => (action) => {
  const currentState = store.getState().counter.value;

  if (currentState >= 19 || currentState <= 2) {
     console.log("Store is exceeded click reset to Work again ");
     return next(reset);
  }
  console.log("currentState:", currentState);
  return next(action);
};

//  the initial state
let preloadedState = {
  counter: {
    value: 10,
  },
};

const simpleEnhancer = (createstore) => (reducer, preloadedState, enhancer) => {
  const store = createstore(reducer, preloadedState, enhancer);

  const enhancedStore = {
    ...store,
    resetCounter: () => {
      console.log("we are in enhancer");
      store.dispatch(reset());
    },
  };

  return enhancedStore;
};

// Add the pokemonApi.middleware to the customMiddleware array
const customMiddleware = [pokemonApi.middleware];
const debounceNotify = _.debounce((notify) => notify());

const store = configureStore({
  reducer: {
    counter: counterReducer,
    [pokemonApi.reducerPath]: pokemonApi.reducer,
    todo: todoSlice,
  },
  middleware: [...customMiddleware, middleware1, thunk],
  devTools: process.env.NODE_ENV !== "production",
  preloadedState,
  enhancers: [simpleEnhancer, batchedSubscribe(debounceNotify)],
});

setupListeners(store.dispatch);

export default store;

  //   If NODE_ENV is set to 'development', the condition process.env.NODE_ENV !== 'production' evaluates to true, and the DevTools are enabled. This means you can use the Redux DevTools in your development environment to inspect and debug your Redux state and actions.

  // If NODE_ENV is set to 'production', the condition process.env.NODE_ENV !== 'production' evaluates to false, and the DevTools are disabled. This is important because you typically don't want to expose debugging tools to end-users on a production website, as it can be a security risk and unnecessary for regular users.