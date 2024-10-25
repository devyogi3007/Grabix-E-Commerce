import * as types from './adminAuth.types';

const initialState = {
    user: JSON.parse(localStorage.getItem("adminInfoF")) || "",
    isLoading: false,
    isError: false
};

const reducer = (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case types.ADMIN_AUTH_GET:
            return { ...state, user: payload }
        case types.ADMIN_AUTH_DELETE:
            return { ...state, user: "" }

        default:
            return state;
    }
}

export { reducer };