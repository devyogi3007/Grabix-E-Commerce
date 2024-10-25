import { getUserAPI } from './user.api';
import * as types from './user.types';

const userRequest = () => {
    return { type: types.USER_REQUEST };
};
const userError = () => {
    return { type: types.USER_ERROR };
}
const userSuccess = (payload) => {
    return { type: types.USER_SUCCESS, payload }
};

const getUsers = (category, params) => async (dispatch) => {
    dispatch(userRequest());
    try {
        let res = await getUserAPI(category, params);
        dispatch(userSuccess(res));
    } catch (error) {
        dispatch(userError());
    }
}

export { getUsers }