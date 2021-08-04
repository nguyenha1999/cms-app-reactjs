import { all } from 'redux-saga/effects'
import documentSaga from './Document'
import procedureSaga from './Procedure'
import historySaga from './History'
import authSaga from './User/auth'
import userSaga from './User/user'

export default function* rootSaga() {
  yield all([
    authSaga(),
    userSaga(),
    documentSaga(),
    procedureSaga(),
    historySaga(),
  ]);
}