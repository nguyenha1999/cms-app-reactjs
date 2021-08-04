import { call, put, takeLatest, delay } from 'redux-saga/effects';
import {
    typesAuth, updateProfileError, updateProfileSuccess, userLoginError,
    userLoginSuccess, userLogoutError, userLogoutSuccess
} from './../../actions/User';
import { showLoading, hideLoading } from './../../actions/Ui';
import UserApi from './../../../api/User/UserApi';
import { notification } from 'antd';

function* userLogin(action) {

    try {

        yield put(showLoading({ loadingFull: true }));

        if (action.payload.username == "admin" && action.payload.password == "123456") {
            yield delay(1000);
            yield put(userLoginSuccess({
                token: "fake",
                user: {
                    fullname: "admin",
                    username: "admin"
                },
                role: "admin"
            }));
        }
        else {

            const response = yield call(UserApi.login, action.payload);
            yield put(userLoginSuccess(response));
        }

        yield put(hideLoading());
        notification.info({
            message: 'Thông báo',
            description: 'Wellcome to system.'
        });


    } catch (e) {
        console.log(e, "e");
        yield put(hideLoading());
        yield put(userLoginError(e));
        notification.error({
            message: 'Auth_error',
            description: 'Sai tên đăng nhập hoặc mật khẩu.'
        });
    }

}

function* userRegister(action) {

    try {
        console.log("userRegister")
        const response = yield call(UserApi.register, action.payload);
        console.log(response, 'response')
        yield put(hideLoading());
        notification.info({
            message: 'Thông báo',
            description: 'Tạo tài khoản thành công.'
        });


    } catch (e) {
        console.log(e);
        yield put(hideLoading());
        notification.error({
            message: 'Auth_error',
            description: 'Đăng ký không thành công.'
        });
    }

}

function* userLogout() {
    try {

        yield put(showLoading());
        const response = yield call(UserApi.logout);
        yield put(userLogoutSuccess(response));
        yield put(hideLoading());
    } catch (e) {
        yield put(hideLoading());
        yield put(userLogoutError(e));
    }

}


function* updateProfile(action) {
    try {

        yield put(showLoading());
        yield delay(1000);
        const response = yield call(UserApi.updateProfile, action.payload);
        yield put(updateProfileSuccess(response));
        yield put(hideLoading());
        notification.info({
            message: 'Thông báo',
            description: 'Cập nhật hồ sơ thành công.'
        });

    } catch (e) {
        yield put(hideLoading());
        yield put(updateProfileError(e));
        notification.error({
            message: 'Thông báo',
            description: 'Vui lòng thử lại.'
        });
    }

}

export default function* authSaga() {
    yield takeLatest(typesAuth.USER_LOGIN, userLogin);
    yield takeLatest(typesAuth.USER_REGISTER, userRegister);
    yield takeLatest(typesAuth.USER_LOGOUT, userLogout);
    yield takeLatest(typesAuth.UPDATE_PROFILE, updateProfile);
}
