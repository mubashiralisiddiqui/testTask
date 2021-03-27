import "./interceptors";

import { TASK_URL } from "./urls";

import { get, post, destroy, put } from "./";

export const getTask = async () => {
    return get({ url: TASK_URL });
};

export const createTask = async (body) => {
    return post({ url: TASK_URL, body });
};

export const deleteTask = async (id) => {
    return destroy({
        url: `${TASK_URL}/${id} `
    });
};
export const updateTask = async (payload) => {
    return put({
        url: `${TASK_URL}/${payload.id}`, body: payload.obj
    });
};
