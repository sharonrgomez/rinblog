import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import { createBrowserHistory } from "history";
import LoginPage from "../components/LoginPage";
import PostDashboardPage from "../components/PostDashboardPage";
import AddPostPage from "../components/AddPostPage";
import EditPostPage from "../components/EditPostPage";
import NotFoundPage from "../components/NotFoundPage";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";

export const history = createBrowserHistory();

const AppRouter = () => (
    <Router history={history}>
        <>
            <Switch>
                <Route path="/" component={LoginPage} exact={true} />
                <PrivateRoute path="/dashboard" component={PostDashboardPage} />
                <PrivateRoute path="/create" component={AddPostPage} />
                <PrivateRoute path="/edit/:id" component={EditPostPage} />
                <Route component={NotFoundPage} />
            </Switch>
        </>
    </Router>
);

export default AppRouter;