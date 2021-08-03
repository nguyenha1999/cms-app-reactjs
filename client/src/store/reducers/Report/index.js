import { types } from "../../actions/Report";

const initState = {
    overview: {}
};

export default (state = initState, action) => {
    switch (action.type) {
        case types.GET_REPORT_OVERVIEW_SUCCESS:
            return {
                ...state
            }
        case types.GET_REPORT_OVERVIEW_ERROR:
            return {
                ...state
            }
        default:
            return {
                ...state
            }

    }
}