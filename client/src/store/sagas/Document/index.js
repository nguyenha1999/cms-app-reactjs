import { call, put, takeLatest } from 'redux-saga/effects';
import {
    getListDocumentSuccess, getListDocumentError, types, editDocumentSuccess,
    createDocumentSuccess, createDocumentError, deleteDocumentSuccess
} from './../../actions/Document';
import DocumentApi from './../../../api/Document/documentApi';
import { sagaPromise } from './../../../helpers/saga-promise-helpers';

function* getListDocument(action) {
    try {
        console.log(action.payload, "action.payload");
        const response = yield call(DocumentApi.getAll, action.payload);
        console.log(response, "response");
        yield put(getListDocumentSuccess(response));
        return response;
    } catch (e) {
        yield put(getListDocumentError(e));
        return e;
    }
}

function* createDocument(action) {

    try {
        const response = yield call(DocumentApi.create, action.payload);
        yield put(createDocumentSuccess(response));
        return response;
    } catch (e) {
        yield put(createDocumentError(e));
        return e;
    }
}

function* deleteDocument(action) {
    try {
        console.log(action, "action");
        const response = yield call(DocumentApi.delete, action.payload);
        yield put(deleteDocumentSuccess(response));
        return response;
    } catch (e) {
        return e;
    }
}

function* editDocument(action) {
    try {
        const response = yield call(DocumentApi.edit, action.payload);
        yield put(editDocumentSuccess(response));
        return response;
    } catch (e) {
        return e;
    }
}

function* downloadDocument(action) {
    try {
        const response = yield call(DocumentApi.download, action.payload);
        return response;
    } catch (e) {
        return e;
    }
}

export default function* documentSaga() {
    yield takeLatest(types.GET_LIST_DOCUMENT, sagaPromise(getListDocument));
    yield takeLatest(types.CREATE_DOCUMENT, sagaPromise(createDocument));
    yield takeLatest(types.DELETE_DOCUMENT, sagaPromise(deleteDocument));
    yield takeLatest(types.EDIT_DOCUMENT, sagaPromise(editDocument));
    yield takeLatest(types.DOWNLOAD_DOCUMENT, sagaPromise(downloadDocument));
}
