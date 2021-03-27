import React from "react";
import { Route, Redirect } from "react-router-dom";

import { Home_URL } from "../../constant";
import { getItem } from "../../utils/helper";
import { useAuth } from '../../context/Auth'

const PublicRoutes = ({
    component: Component,
    restricted,
    ...rest
}) => {
    // const user = getAccessToken();
    const { token } = useAuth()

    return (
        <Route
            {...rest}
            render={props =>
                token ? (
                    <Redirect to={Home_URL} />
                ) : (
                    <Component {...props} />
                )
            }
        />
    );
};

export default PublicRoutes;
