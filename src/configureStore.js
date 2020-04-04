import { applyMiddleware, compose, createStore } from "redux";

import logger from "redux-logger";
import rootReducer from "reducers";

export default function configureStore(preloadedState) {
  let middlewares = [];
  if (process.env.NODE_ENV === "development") {
    middlewares.push(logger);
  }
  const middlewareEnhancer = applyMiddleware(...middlewares);

  const enhancers = [middlewareEnhancer];
  const composedEnhancers = compose(...enhancers);

  const store = createStore(rootReducer, preloadedState, composedEnhancers);

  if (process.env.NODE_ENV !== "production" && module.hot) {
    module.hot.accept("./reducers", () => store.replaceReducer(rootReducer));
  }

  return store;
}
