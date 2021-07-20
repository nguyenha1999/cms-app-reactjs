/* eslint-disable import/no-anonymous-default-export */
/* eslint-disable eqeqeq */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-sequences */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import { types } from "../action/doc";

const initialState = {
    items: [],
    total: 0,
    errors: [],


};

export default (state = initialState, action) => {
    let index = -1;
    let newItems = [];

    switch (action.type) {
        case types.GET_LIST_DOCUMENT_SUCCESS:
            console.log(action.data)
            const newData = action.data.data.filter(item => item._id === false);
            return {
                ...state,
                items: newData,
                total: action.data.total,
            };

        case types.CREATE_DOCUMENT_SUCCESS:
            state.items = [action.data.data, ...state.items],
                state.total = state.total + 1;
            return {
                ...state,
            };

        case types.DELETE_DOCUMENT_SUCCESS:
            // state.items = state.items.filter(item => item._id != action.data._id);
            state.total = state.total - 1;
            return {
                ...state,
            };

        case types.EDIT_DOCUMENT_SUCCESS:
            index = state.items.findIndex(item => item.id == action.data.id);
            console.log(index)
            newItems = [...state.items];
            if (index >= 0) {
                newItems[index] = action.data.data
            }
            return {
                ...state,
                items: newItems
            };

        default:
            return state;

    }
};