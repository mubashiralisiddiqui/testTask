import "./interceptors";

import { LOGIN_URL } from "./urls";

import { post } from "./";

export const login = async (body) => {
    return post({ url: LOGIN_URL, body: body })
};


