import { postRequest } from './requests';

const register = (params) => {
    const { path, data } = params;
    return postRequest({
        path,
        data,
    });
};

const login = (params) => {
    const { path, data } = params;
    return postRequest({
        path,
        data,
    });
};

export { register, login };
