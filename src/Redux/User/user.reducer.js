import * as types from './user.types';
const initialState = {
    users: [],
    isLoading: false,
    isError: false,
    totalCount: 0
};

const reducer = (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case types.USER_REQUEST:
            return { ...state, isLoading: true }
        case types.USER_ERROR:
            return { ...state, isLoading: false, isError: true }
        case types.USER_SUCCESS:
            return {
                ...state,
                isLoading: false,
                users: payload.data,
                totalCount: payload.totalCount
            }
        default:
            return state;
    }
}

export { reducer }