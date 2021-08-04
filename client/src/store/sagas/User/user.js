import { call, put, takeLatest, delay } from 'redux-saga/effects';
import { addUserError, addUserSuccess, deleteUserError, deleteUserSuccess, filterUserError, filterUserSuccess, getListUserError, getListUserSuccess, typesUser, updateUserError, updateUserSuccess } from './../../actions/User';
import { showLoading, hideLoading } from './../../actions/Ui';
import UserApi from './../../../api/User/UserApi';
import { notification } from 'antd';
import { sagaPromise } from '../../../helpers/saga-promise-helpers';

function* getListUser(action) {

    try {
        yield put(showLoading());
        yield delay(500);
        const response = yield call(UserApi.getAll, action.payload);
        yield put(getListUserSuccess(response));
        yield put(hideLoading());
    } catch (e) {
        yield put(hideLoading());
        yield put(getListUserError(e));
        notification.error({
            message: 'Thông báo',
            description: 'Lỗi: ' + e.message
        });
    }
}

function* filterListUser(action) {

    try {
        yield put(showLoading());
        yield delay(500);
        const response = yield call(UserApi.filter, action.payload);
        yield put(filterUserSuccess(response));
        yield put(hideLoading());
    } catch (e) {
        yield put(hideLoading());
        yield put(filterUserError(e));
        notification.error({
            message: 'Thông báo',
            description: 'Lỗi: ' + e.message
        });
    }
}


function* addUser(action) {

    try {
        yield put(showLoading());
        yield delay(500);
        const response = yield call(UserApi.add, action.payload);
        yield put(addUserSuccess(response));
        yield put(hideLoading());
        notification.info({
            message: 'Thông báo',
            description: 'Thêm mới người dùng thành công.'
        });

    } catch (e) {
        yield put(hideLoading());
        yield put(addUserError(e));
        notification.error({
            message: 'Thông báo',
            description: 'Lỗi: ' + e.message
        });
    }
}


function* updateUser(action) {

    try {
        yield put(showLoading());
        const response = yield call(UserApi.update, action.payload);
        yield put(updateUserSuccess(response));
        yield put(hideLoading());
        notification.info({
            message: 'Thông báo',
            description: 'Cập nhật người dùng thành công.'
        });

    } catch (e) {
        yield put(hideLoading());
        yield put(updateUserError(e));
        console.log(e, 'eeee')
        notification.error({
            message: 'Thông báo',
            description: 'Lỗi: ' + e.message
        });
    }
}

function* deleteUser(action) {
    try {
        const response = yield call(UserApi.delete, action.payload);
        yield put(deleteUserSuccess(response));
        return response;
    } catch (e) {
        return e;
    }
}

export default function* userSaga() {
    yield takeLatest(typesUser.GET_LIST_USER, getListUser);
    yield takeLatest(typesUser.FILTER_USER, filterListUser);
    yield takeLatest(typesUser.ADD_USER, addUser);
    yield takeLatest(typesUser.UPDATE_USER, sagaPromise(updateUser));
    yield takeLatest(typesUser.DELETE_USER, sagaPromise(deleteUser));
}

