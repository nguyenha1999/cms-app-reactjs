import { typesAuth, typesUser } from "../../actions/User";

const initState = {
    token: localStorage.getItem('token'),
    user: null,
    role: null,
    login: false,
    users: []
};

let users = [];
let index = -1;

export default (state = initState, action) => {

    switch (action.type) {

        case typesAuth.USER_LOGIN_SUCCESS:
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

        case typesAuth.USER_LOGIN_ERROR:
            console.log(action.payload.data, 'USER_LOGIN_ERROR');
            return {
                ...state,
            };

        case typesAuth.USER_LOGOUT:
            localStorage.removeItem('token');
            state.token = null;
            state.user = null;
            state.login = false;
            return {
                ...state
            }

        case typesAuth.USER_LOGIN_ERROR:
            return {
                ...state
            }

        case typesAuth.UPDATE_PROFILE_SUCCESS:
            const user = {
                ...state.user,
                password: action.payload.password,
            };
            return {
                ...state, user: user
            }

        case typesAuth.UPDATE_PROFILE_ERROR:
            return {
                ...state
            }

        case typesUser.GET_LIST_USER_SUCCESS:
            return {
                ...state, users: action.payload.map((item, index) => ({ index: index + 1, ...item }))
            }

        case typesUser.GET_LIST_USER_ERROR:
            return {
                ...state
            }
        case typesUser.ADD_USER_SUCCESS:
            return {
                ...state, users: [...state.users, { index: state.users.length + 1, ...action.payload }]
            }

        case typesUser.ADD_USER_ERROR:
            return {
                ...state
            }
        case typesUser.UPDATE_USER_SUCCESS:
            users = state.users;
            index = users.findIndex(item => item._id == action.payload._id);
            if (index != -1) {
                users[index] = action.payload
            }
            return {
                ...state, users: [...users]
            }

        case typesUser.UPDATE_USER_ERROR:
            return {
                ...state
            }

        case typesUser.DELETE_USER_SUCCESS:
            state.users = state.users.filter(item => item._id != action.payload._id);
            return {
                ...state,
            };

        case typesUser.DELETE_USER_ERROR:
            return {
                ...state
            }

        default:
            return state;

    }
};