import { types } from "../../actions/Document";

const initState = {
    items: [],
    total: 0,
    errors: []
};

export default (state = initState, action) => {
    let index = -1;
    let newItems = [];
    switch (action.type) {
        case types.GET_LIST_DOCUMENT_SUCCESS:
            console.log(action.data, "action.data");
            return {
                ...state,
                items: action.data.data,
                total: action.data.total,
            };

        case types.CREATE_DOCUMENT_SUCCESS:
            state.items = [action.data, ...state.items],
                state.total = state.total + 1;
            return {
                ...state,
            };

        case types.DELETE_DOCUMENT_SUCCESS:
            console.log(action.data, "action.data");
            state.items = state.items.filter(item => item._id != action.data._id);
            state.total = state.total - 1;
            return {
                ...state,
            };

        case types.EDIT_DOCUMENT_SUCCESS:
            index = state.items.findIndex(item => item._id == action.data._id);
            newItems = [...state.items];
            if (index >= 0) {
                newItems[index] = action.data
            }
            return {
                ...state,
                items: newItems
            };

        default:
            return state;

    }
};