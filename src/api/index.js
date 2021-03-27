import axios from "axios";

export const get = async ({ url }) => {
    return axios.get(url);
};

export const post = async ({ url, body, headers }) => {
    if (headers) {
        return axios.post(url, body, { headers });
    }
    return axios.post(url, body);
};
export const put = async ({ url, body, headers }) => {
    return axios.put(url, body);
};

export const destroy = async ({ url, body, headers }) => {
    return axios.delete(url, { data: body });
};
