import { call, put, takeLatest } from 'redux-saga/effects';
import {
    getListProcedureSuccess, getListProcedureError, types, editProcedureSuccess,
    createProcedureSuccess, createProcedureError, deleteProcedureSuccess, editDocumentToProcedureSuccess
} from '../action/group.js';
import ProcedureApi from '../../services/apiprocedure';
import DocumentApi from '../../services/apidocument';


function* getListProcedure(action) {
    try {
        const response = yield call(ProcedureApi.getAll, action.id, action.payload);
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
        const response = yield call(ProcedureApi.delete, action.id, action.payload);
        yield put(deleteProcedureSuccess(response));
        if (response.status === 200) { action.onSuccess() }
        return response;
    } catch (e) {
        return e;
    }
}

function* editProcedure(action) {
    try {
        const response = yield call(ProcedureApi.edit, action.id, action.payload);
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

export default function* procedureSaga() {
    yield takeLatest(types.GET_LIST_PROCEDURE, getListProcedure);
    yield takeLatest(types.CREATE_PROCEDURE, createProcedure);
    yield takeLatest(types.DELETE_PROCEDURE, deleteProcedure);
    yield takeLatest(types.EDIT_PROCEDURE, editProcedure);
    yield takeLatest(types.DOWNLOAD_PROCEDURE, downloadProcedure);
    yield takeLatest(types.EDIT_DOCUMENT_PROCEDURE, editDocumentProcedure);
}
