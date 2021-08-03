import { types } from "../../actions/User";

const initState = {
    token: localStorage.getItem('token'),
    user: null,
    role: null,
    login: false,
    users: []
};

export default (state = initState, action) => {

    switch (action.type) {

        case types.USER_LOGIN_SUCCESS:
            state.token = action.payload.token;
            localStorage.setItem('token', state.token);
            state.user = {
                _id: action.payload._id,
                email: action.payload.email,
                firstName: action.payload.firstName,
                lastName: action.payload.lastName,
                createdDate: action.payload.createdDate,
                fullName: action.payload.fullName
            };
            state.login = true;
            return {
                ...state,
            };

        case types.USER_LOGIN_ERROR:
            console.log(action.payload.data, 'USER_LOGIN_ERROR');
            return {
                ...state,
            };

        case types.USER_LOGOUT:
            localStorage.removeItem('token');
            state.token = null;
            state.user = null;
            state.login = false;
            return {
                ...state
            }

        case types.USER_LOGIN_ERROR:
            return {
                ...state
            }

        case types.UPDATE_PROFILE_SUCCESS:
            const user = {
                ...state.user,
                password: action.payload.password,
            };
            return {
                ...state, user: user
            }

        case types.UPDATE_PROFILE_ERROR:
            return {
                ...state
            }
        default:
            return state;

    }
};