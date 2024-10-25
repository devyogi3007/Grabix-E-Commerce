import * as types from './adminAuth.types';

export const adminLogin = (payload) => {
    return { type: types.ADMIN_AUTH_GET, payload };

}

export const adminLogout = () => {
    return { type: types.ADMIN_AUTH_DELETE };
}