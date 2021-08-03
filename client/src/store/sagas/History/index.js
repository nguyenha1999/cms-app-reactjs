import { call, put, takeLatest } from 'redux-saga/effects';
import {
    getListHistorySuccess, types
} from './../../actions/History';
import historyApi from './../../../api/History/HistoryApi';
import { sagaPromise } from './../../../helpers/saga-promise-helpers';

function* getListHistory(action) {

    try {
        const response = yield call(historyApi.getList, action.payload);
        yield put(getListHistorySuccess(response));

        return response;
    } catch (e) {
        return e;
    }
}

export default function* historySaga() {
    yield takeLatest(types.GET_LIST_HISTORY, sagaPromise(getListHistory));
}
