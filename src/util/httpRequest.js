import axios from 'axios';

const httpRequest = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
});

export const get = async (path, option = []) => {
    const reponse = await httpRequest.get(path, option);
    return reponse.data;
};

export const post = async (path, data = {}) => {
    let request;
    if (Object.keys(data).length !== 0) {
        request = await httpRequest.post(path, data);
    }
    return request.data;
};

export const put = async (path, data = {}) => {
    let request;
    if (Object.keys(data).length !== 0) {
        request = await httpRequest.put(path, data);
    }
    return request.data;
};

export default httpRequest;
