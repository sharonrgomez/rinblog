import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { firebase } from './utilities/firebase'
import LoadingPage from './components/LoadingPage'
import configureStore from './store/configureStore'
import AppRouter from './routers/AppRouter'
import { login, logout } from './actions/auth'
import 'normalize.css/normalize.css'
import './styles/styles.scss'

const store = configureStore()

const jsx = (
    <Provider store={store}>
        <AppRouter />
    </Provider>
)

// show loading image if app not loaded yet
let hasRendered = false
const renderApp = () => {
    if (!hasRendered) {
        ReactDOM.render(jsx, document.getElementById('app'))
        hasRendered = true
    }
}

ReactDOM.render(<LoadingPage />, document.getElementById('app'))

firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        store.dispatch(login(user.uid))
    } else {
        store.dispatch(logout())
    }
    renderApp()
})