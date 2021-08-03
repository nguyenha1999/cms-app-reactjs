import { all } from 'redux-saga/effects'
import authSaga from './User'
import documentSaga from './Document'
import procedureSaga from './Procedure'
import historySaga from './History'

export default function* rootSaga() {
  yield all([
    documentSaga(),
    authSaga(),
    procedureSaga(),
    historySaga(),
  ]);
}