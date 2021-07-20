import { all, call } from "redux-saga/effects";
import documentSaga from "./doc";
import procedureSaga from "./group";


export default function* rootSaga() {
    yield all([
        call(documentSaga),
        call(procedureSaga),

    ]);
}