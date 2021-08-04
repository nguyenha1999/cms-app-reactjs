export const typesUser = {
    GET_LIST_USER: 'GET_LIST_USER',
    GET_LIST_USER_SUCCESS: 'GET_LIST_USER_SUCCESS',
    GET_LIST_USER_ERROR: 'GET_LIST_USER_ERROR',
    ADD_USER: 'ADD_USER',
    ADD_USER_SUCCESS: 'ADD_USER_SUCCESS',
    ADD_USER_ERROR: 'ADD_USER_ERROR',
    UPDATE_USER: 'UPDATE_USER',
    UPDATE_USER_SUCCESS: 'UPDATE_USER_SUCCESS',
    UPDATE_USER_ERROR: 'UPDATE_USER_ERROR',
    DELETE_USER: 'DELETE_USER',
    DELETE_USER_SUCCESS: 'DELETE_USER_SUCCESS',
    DELETE_USER_ERROR: 'DELETE_USER_ERROR',
    FILTER_USER: 'FILTER_USER',
    FILTER_USER_SUCCESS: 'FILTER_USER_SUCCESS',
    FILTER_USER_ERROR: 'FILTER_USER_ERROR',
}

export const getListUser = (payload) => ({
    type: typesUser.GET_LIST_USER,
    payload
})

export const getListUserSuccess = (payload) => ({
    type: typesUser.GET_LIST_USER_SUCCESS,
    payload
})


export const getListUserError = (payload) => ({
    type: typesUser.GET_LIST_USER_ERROR,
    payload
})


export const addUser = (payload) => ({
    type: typesUser.ADD_USER,
    payload
})

export const addUserSuccess = (payload) => ({
    type: typesUser.ADD_USER_SUCCESS,
    payload
})


export const addUserError = (payload) => ({
    type: typesUser.ADD_USER_ERROR,
    payload
})

export const updateUser = (id, payload) => ({
    type: typesUser.UPDATE_USER,
    id,
    payload
})

export const updateUserSuccess = (payload) => ({
    type: typesUser.UPDATE_USER_SUCCESS,
    payload
})


export const updateUserError = (payload) => ({
    type: typesUser.UPDATE_USER_ERROR,
    payload
})

export const deleteUser = (payload) => ({
    type: typesUser.DELETE_USER,
    payload
})

export const deleteUserSuccess = (payload) => ({
    type: typesUser.DELETE_USER_SUCCESS,
    payload
})


export const deleteUserError = (payload) => ({
    type: typesUser.DELETE_USER_ERROR,
    payload
})

export const filterUser = (id) => ({
    type: typesUser.FILTER_USER,
    id
})

export const filterUserSuccess = (payload) => ({
    type: typesUser.FILTER_USER_SUCCESS,
    payload
})


export const filterUserError = (payload) => ({
    type: typesUser.FILTER_USER_ERROR,
    payload
})
