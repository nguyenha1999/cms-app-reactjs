export const typesAuth = {
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
    type: typesAuth.USER_LOGIN,
    payload
})

export const userLoginSuccess = (payload) => ({
    type: typesAuth.USER_LOGIN_SUCCESS,
    payload
})


export const userLoginError = (payload) => ({
    type: typesAuth.USER_LOGIN_ERROR,
    payload
})


export const userRegister = (payload) => ({
    type: typesAuth.USER_REGISTER,
    payload
})

export const userRegisterSuccess = (payload) => ({
    type: typesAuth.USER_REGISTER_SUCCESS,
    payload
})


export const userRegisterError = (payload) => ({
    type: typesAuth.USER_REGISTER_ERROR,
    payload
})

export const userLogout = () => ({
    type: typesAuth.USER_LOGOUT
})

export const userLogoutError = () => ({
    type: typesAuth.USER_LOGOUT_ERROR
})

export const userLogoutSuccess = () => ({
    type: typesAuth.USER_LOGOUT_SUCCESS
})


export const updateProfile = (payload) => ({
    type: typesAuth.UPDATE_PROFILE,
    payload
})

export const updateProfileSuccess = (payload) => ({
    type: typesAuth.UPDATE_PROFILE_SUCCESS,
    payload
})

export const updateProfileError = (payload) => ({
    type: typesAuth.UPDATE_PROFILE_ERROR,
    payload
})
