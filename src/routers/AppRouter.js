import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import { createBrowserHistory } from "history";
import PublicPostList from "../components/PublicPostList";
import UserPostList from "../components/UserPostList";
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
                <PublicRoute path='/' component={PublicPostList} exact={true} />
                <PrivateRoute path="/me" component={UserPostList} />
                <PrivateRoute path="/create" component={AddPostPage} />
                <PrivateRoute path="/edit/:id" component={EditPostPage} />
                <Route component={NotFoundPage} />
            </Switch>
        </>
    </Router>
);

export default AppRouter;