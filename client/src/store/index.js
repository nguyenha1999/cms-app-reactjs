import React from "react"
import { Provider } from "react-redux"
import { configureStore } from "@reduxjs/toolkit"
import createSagaMiddleware from "redux-saga"
import rootReducer from "./reducers"
import rootSaga from "./sagas"

import { persistStore } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'

const sagaMiddleware = createSagaMiddleware();

const storeApp = configureStore({
  reducer: rootReducer,
  middleware: [sagaMiddleware],
});

let persistor = persistStore(storeApp);

const Store = (props) => {
  return (
    <Provider store={storeApp}>
      <PersistGate loading={null} persistor={persistor}>
        {props.children}
      </PersistGate>
    </Provider>
  );
};

sagaMiddleware.run(rootSaga);
export default Store;
