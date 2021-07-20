import { applyMiddleware ,createStore} from "redux";
import rootReducer from "./reducer/index";
import rootSaga from "./sagas/index";
import createSagaMiddleware from "redux-saga";
import { composeWithDevTools } from "redux-devtools-extension";



const sagaMiddleware = createSagaMiddleware();

const configStore = () => {
    const store  = createStore(
        rootReducer,
        {},
        composeWithDevTools(applyMiddleware(sagaMiddleware)));
       sagaMiddleware.run(rootSaga);
       return store;
    
};

export default configStore;
