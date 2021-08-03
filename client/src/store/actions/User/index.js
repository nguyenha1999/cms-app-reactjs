export const types = {
    USER_LOGIN: 'USER_LOGIN',
    USER_LOGIN_SUCCESS: 'USER_LOGIN_SUCCESS',
    USER_LOGIN_ERROR: 'USER_LOGIN_ERROR',
    USER_REGISTER: 'USER_REGISTER',
    USER_REGISTER_SUCCESS: 'USER_REGISTER_SUCCESS',
    USER_REGISTER_ERROR: 'USER_REGISTER_ERROR',
    USER_LOGOUT: 'USER_LOGOUT',
    USER_LOGOUT_ERROR: 'USER_LOGOUT_ERROR',
    USER_LOGOUT_SUCCESS: 'USER_LOGOUT_SUCCESS',
    UPDATE_PROFILE: 'UPDATE_PROFILE',
    UPDATE_PROFILE_SUCCESS: 'UPDATE_PROFILE_SUCCESS',
    UPDATE_PROFILE_ERROR: 'UPDATE_PROFILE_ERROR',
}

export const userLogin = (payload) => ({
    type: types.USER_LOGIN,
    payload
})

export const userLoginSuccess = (payload) => ({
    type: types.USER_LOGIN_SUCCESS,
    payload
})


export const userLoginError = (payload) => ({
    type: types.USER_LOGIN_ERROR,
    payload
})


export const userRegister = (payload) => ({
    type: types.USER_REGISTER,
    payload
})

export const userRegisterSuccess = (payload) => ({
    type: types.USER_REGISTER_SUCCESS,
    payload
})


export const userRegisterError = (payload) => ({
    type: types.USER_REGISTER_ERROR,
    payload
})

export const userLogout = () => ({
    type: types.USER_LOGOUT
})

export const userLogoutError = () => ({
    type: types.USER_LOGOUT_ERROR
})

export const userLogoutSuccess = () => ({
    type: types.USER_LOGOUT_SUCCESS
})


export const updateProfile = (payload) => ({
    type: types.UPDATE_PROFILE,
    payload
})

export const updateProfileSuccess = (payload) => ({
    type: types.UPDATE_PROFILE_SUCCESS,
    payload
})

export const updateProfileError = (payload) => ({
    type: types.UPDATE_PROFILE_ERROR,
    payload
})
