import { types } from "../../actions/Ui";

const initialState = {
    showLoading: false,
    loadingFull: false
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case types.SHOW_LOADING: {
            return {
                ...state,
                showLoading: true,
                loadingFull: action.payload?.loadingFull ?? false
            };
        }
        case types.HIDE_LOADING: {
            return {
                ...state,
                showLoading: false,
                loadingFull: false
            };
        }


        default:
            return state;
    }
};

export default reducer;
