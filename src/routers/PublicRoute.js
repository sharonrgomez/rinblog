import React from "react";
import { Route } from "react-router-dom";
import Header from "../components/Header";

export const PublicRoute = ({
    component: Component,
    ...rest
}) => (
        <Route {...rest} component={(props) => (
            <>
                <Header />
                <Component {...props} />
            </>
        )} />
    );


export default PublicRoute;