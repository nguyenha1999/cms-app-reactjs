import { call, put, takeLatest } from 'redux-saga/effects';
import {
    getListDocumentSuccess, getListDocumentError, types, editDocumentSuccess,
    createDocumentSuccess, createDocumentError, deleteDocumentSuccess
} from '../action/doc.js';
import DocumentApi from '../../services/apidocument';

function* getListDocument(action) {
    try {
        const response = yield call(DocumentApi.getAll, action.id, action.payload);
        console.log(response, "h")
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
        const response = yield call(DocumentApi.delete, action.id, action.payload);
        if (response.status === 200) { action.onSuccess() }
        yield put(deleteDocumentSuccess(response));
        return response;
    } catch (e) {
        console.log(e, "e")
        return e;
    }
}

function* editDocument(action) {
    console.log("acb")
    try {
        const response = yield call(DocumentApi.edit, action.id, action.payload);
        console.log(response, "e")
        if (response.status === 200) { action.onSuccess() }
        yield put(editDocumentSuccess(response));
        return response;
    } catch (e) {
        return e;
    }
}


export default function* documentSaga() {
    yield takeLatest(types.GET_LIST_DOCUMENT, getListDocument);
    yield takeLatest(types.CREATE_DOCUMENT, createDocument);
    yield takeLatest(types.DELETE_DOCUMENT, deleteDocument);
    yield takeLatest(types.EDIT_DOCUMENT, editDocument);
}
