import React from "react";
import { Route, Redirect } from "react-router-dom";

import { useAuth } from '../../context/Auth'
import { LOGIN_URL, ACCESS_TOKEN } from '../../constant'
import Drawer from '../Drawer'
const PrivateRoutes = ({
    component: Component,
    history,
    ...rest
}) => {
    //   const token = getAccessToken();
    const { logout } = useAuth()
    const accessToken = localStorage.getItem(ACCESS_TOKEN)
    return (
        <Route
            {...rest}
            render={props =>
                accessToken ? (
                    <Drawer logout={logout}>
                        <Component {...props} />
                    </Drawer>
                ) : (
                    <Redirect to={LOGIN_URL} />

                )
            }
        />
    );
};

export default PrivateRoutes;
