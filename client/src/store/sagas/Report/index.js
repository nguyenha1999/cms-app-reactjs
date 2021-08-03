import { call, put, takeLatest } from 'redux-saga/effects';
import {
    getReportOverviewError,
    getReportOverviewSuccess,
    types
} from './../../actions/Report';
import ReportApi from './../../../api/Report/ReportApi';
import { sagaPromise } from './../../../helpers/saga-promise-helpers';

function* getReportOverview(action) {
    try {
        const response = yield call(ReportApi.overview, action.payload);
        yield put(getReportOverviewSuccess(response));
        return response;
    } catch (e) {
        yield put(getReportOverviewError(e));
        return e;
    }
}


export default function* documentSaga() {
    yield takeLatest(types.GET_REPORT_OVERVIEW, sagaPromise(getReportOverview));
}
