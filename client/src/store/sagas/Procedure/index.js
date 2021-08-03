import { call, put, takeLatest } from 'redux-saga/effects';
import {
    getListProcedureSuccess, getListProcedureError, types, editProcedureSuccess,
    createProcedureSuccess, createProcedureError, deleteProcedureSuccess, editDocumentToProcedureSuccess
} from './../../actions/Procedure';
import ProcedureApi from './../../../api/Procedure/ProcedureApi';
import DocumentApi from './../../../api/Document/documentApi';
import { sagaPromise } from './../../../helpers/saga-promise-helpers';

function* getListProcedure(action) {

    try {
        const response = yield call(ProcedureApi.getAll, action.payload);

        yield put(getListProcedureSuccess(response));
        return response;
    } catch (e) {
        yield put(getListProcedureError(e));
        return e;
    }
}

function* createProcedure(action) {

    try {
        const response = yield call(ProcedureApi.create, action.payload);
        yield put(createProcedureSuccess(response));
        return response;
    } catch (e) {
        yield put(createProcedureError(e));
        return e;
    }
}

function* deleteProcedure(action) {
    try {
        const response = yield call(ProcedureApi.delete, action.payload);
        yield put(deleteProcedureSuccess(response));
        return response;
    } catch (e) {
        return e;
    }
}

function* editProcedure(action) {
    try {
        const response = yield call(ProcedureApi.edit, action.payload);
        yield put(editProcedureSuccess(response));
        return response;
    } catch (e) {
        return e;
    }
}

function* downloadProcedure(action) {
    try {
        const response = yield call(ProcedureApi.download, action.payload);
        return response;
    } catch (e) {
        return e;
    }
}

function* editDocumentProcedure(action) {
    try {
        const response = yield call(DocumentApi.edit, action.payload);
        yield put(editDocumentToProcedureSuccess({ ...response, idProcedure: action.payload.idProcedure }));
        return response;
    } catch (e) {
        return e;
    }
}

export default function* documentSaga() {
    yield takeLatest(types.GET_LIST_PROCEDURE, sagaPromise(getListProcedure));
    yield takeLatest(types.CREATE_PROCEDURE, sagaPromise(createProcedure));
    yield takeLatest(types.DELETE_PROCEDURE, sagaPromise(deleteProcedure));
    yield takeLatest(types.EDIT_PROCEDURE, sagaPromise(editProcedure));
    yield takeLatest(types.DOWNLOAD_PROCEDURE, sagaPromise(downloadProcedure));
    yield takeLatest(types.EDIT_DOCUMENT_PROCEDURE, sagaPromise(editDocumentProcedure));
}
