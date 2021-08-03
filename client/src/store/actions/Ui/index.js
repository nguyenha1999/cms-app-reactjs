export const types = {
    SHOW_LOADING: 'SHOW_LOADING',
    HIDE_LOADING: 'HIDE_LOADING'
}

export const showLoading = (payload) => ({
  type: types.SHOW_LOADING,
  payload
});

export const hideLoading = () => ({
  type: types.HIDE_LOADING,
});



