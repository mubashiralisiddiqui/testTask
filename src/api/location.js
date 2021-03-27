import "./interceptors";

import { CHECKIN_URL } from "./urls";

import { get, post, destroy } from "./";

export const getLocation = async () => {
    return get({ url: CHECKIN_URL });
};

export const addLocation = async (body) => {
    return post({ url: CHECKIN_URL, body });
};

export const deleteLocation = async (id) => {
    return destroy({
        url: `${CHECKIN_URL}/${id}`,
    });
};
