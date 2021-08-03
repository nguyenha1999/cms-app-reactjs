export const types = {
    GET_LIST_HISTORY: 'GET_LIST_HISTORY',
    GET_LIST_HISTORY_SUCCESS: 'GET_LIST_HISTORY_SUCCESS',
}

// GET
export const getListHistory = (payload) => ({
    type: types.GET_LIST_HISTORY,
    payload
})

export const getListHistorySuccess = (data) => ({
    type: types.GET_LIST_HISTORY_SUCCESS,
    data
})
