import { types } from "../../actions/History";

const initState = {
    items: [],
    total: 0,
};

export default (state = initState, action) => {
    switch (action.type) {
        case types.GET_LIST_HISTORY_SUCCESS:
            return {
                ...state,
                items: action.data.data,
                total: action.data.total,
            };

        default:
            return state;

    }
};