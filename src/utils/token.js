import { ACCESS_TOKEN } from "../constant";
import { getItem, setItem, removeItem, clearStorage } from "./helper";

export const getAccessToken = () => {
    return JSON.parse(localStorage.getItem(ACCESS_TOKEN))
    // return getItem(ACCESS_TOKEN);
};

export const setToken = (accessToken) => {
    setItem(ACCESS_TOKEN, JSON.stringify(accessToken));
};

export const removeToken = () => {
    removeItem(ACCESS_TOKEN);
    clearStorage();
};
