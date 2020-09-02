import React from "react";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";
import Header from "../components/Header";

export const PublicRoute = ({ isAuthenticated,
    component: Component,
    ...rest
}) => (
        <Route {...rest} component={(props) => (
            isAuthenticated ? (
                <>
                    <Redirect to="/" />
                </>
            ) : (
                    <>
                        <Component {...props} />
                    </>
                )
        )} />
    );

const mapStateToProps = (state) => (
    {
        isAuthenticated: !!state.auth.uid
    }
);

export default connect(mapStateToProps)(PublicRoute);