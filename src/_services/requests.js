import axios from 'axios';

// TODO change to the deployed backend server
const API_URL = 'http://127.0.0.1:8000/';
// const API_URL = 'http://rest-api.com';

// Add headers if needed
const options = {
    headers: {},
};

const getRequest = (params) => {
    const { path } = params;
    const url = API_URL + path;
    return axios.get(url, options);
};

const postRequest = (params) => {
    const { path, data } = params;
    const url = API_URL + path;
    return axios.post(url, data, options);
};

export { getRequest, postRequest };
