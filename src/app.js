import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import "normalize.css/normalize.css";
import AppRouter, { history } from "./routers/AppRouter";
import configureStore from "./store/configureStore";
import { startSetPosts } from "./actions/posts";
import { login, logout } from "./actions/auth";
import { firebase } from "./firebase/firebase";
import LoadingPage from "./components/LoadingPage";
import "./styles/styles.scss";


const store = configureStore();

const jsx = (
    <Provider store={store}>
        <AppRouter />
    </Provider>
);

let hasRendered = false;
const renderApp = () => {
    if (!hasRendered) {
        ReactDOM.render(jsx, document.getElementById("app"));
        hasRendered = true;
    }
};

ReactDOM.render(<LoadingPage />, document.getElementById("app"));

firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        store.dispatch(login(user.uid));
        store.dispatch(startSetPosts()).then(() => {
            renderApp();
            if (history.location.pathname === "/") {
                history.push("/");
            }
        });
    } else {
        store.dispatch(logout());
        renderApp();
        history.push("/");
    }
});