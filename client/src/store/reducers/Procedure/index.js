import { types } from "../../actions/Procedure";

const initState = {
    items: [],
    total: 0,
    errors: []
};

export default (state = initState, action) => {
    let index = -1;
    let newItems = [];
    let result = -1;
    switch (action.type) {
        case types.GET_LIST_PROCEDURE_SUCCESS:
            return {
                ...state,
                items: action.data.data,
                total: action.data.total,
            };

        case types.CREATE_PROCEDURE_SUCCESS:
            state.items = [action.data, ...state.items],
                state.total = state.total + 1;
            return {
                ...state,
            };

        case types.DELETE_PROCEDURE_SUCCESS:
            state.items = state.items.filter(item => item._id != action.data._id);
            state.total = state.total - 1;
            return {
                ...state,
            };

        case types.EDIT_PROCEDURE_SUCCESS:
            index = state.items.findIndex(item => item._id == action.data._id);
            newItems = [...state.items];
            if (index >= 0) {
                newItems[index] = action.data
            }
            return {
                ...state,
                items: newItems
            };

        case types.EDIT_DOCUMENT_PROCEDURE_SUCCESS:
            index = state.items.findIndex(item => item._id == action.data.idProcedure);
            if (index >= 0) {
                result = state.items[index].documents.findIndex(item => item.document._id == action.data._id);
                if (result >= 0) {
                    state.items[index].documents[result].document = action.data;
                }
            }
            return {
                ...state,
                items: [...state.items]
            };

        default:
            return state;

    }
};