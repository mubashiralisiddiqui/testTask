import React, { useEffect, useState, useContext } from 'react';
import { setItem, getItem } from "../../utils/helper";
import { setToken, getAccessToken } from "../../utils/token";

import { ACCESS_TOKEN, USER_KEY, LOGIN_URL } from '../../constant'
import { login } from '../../api/auth'
// import { history } from "../../history";

export const AuthContext = React.createContext(null);
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [state, setState] = useState({
        token: null,
        isLoggedIn: false,
        loading: false,
        error: null,
    })
    useEffect(() => {
        const token = localStorage.getItem(ACCESS_TOKEN);
        if (token) {
            setState({
                ...state,
                token: token,
                isLoggedIn: true
            });
        }
    }, []);
    const handleLogin = async (data, cb) => {
        try {
            // const response = await login(data) // closing this api as its not working
            // if (response && response.data && response.data.token) {
            setToken(process.env.REACT_APP_DEFAULT_APP_TOKEN);
            cb()
            // setState({
            //     ...state,
            //     error: null,
            // })
            // }

        }
        catch (err) {
            console.log('err', err);
            const { response } = err
            if (response && response.data && response.data.message) {
                setState({
                    ...state,
                    error: response.data.message
                })
                return;
            }
            setState({
                ...state,
                error: 'something went wrong'
            })

        }
    }
    const logout = (history) => {
        try {
            localStorage.removeItem(ACCESS_TOKEN);
            // console.log(history)
            history.push(LOGIN_URL)
        } catch (err) {
            console.log(err)
        }

    }
    return (
        <AuthContext.Provider
            value={{
                handleLogin,
                logout,
                ...state,
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}