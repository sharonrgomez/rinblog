import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import postsReducer from '../reducers/posts'
import authReducer from '../reducers/auth'
import avatarReducer from '../reducers/avatar'
import { loadState, saveState } from './localStorage'
import { throttle } from '../utilities/throttle'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export default () => {
    const persistedState = loadState()
    const store = createStore(
        combineReducers({
            posts: postsReducer,
            auth: authReducer,
            avatar: avatarReducer
        }),
        persistedState,
        composeEnhancers(applyMiddleware(thunk))
    )
    store.subscribe(throttle(() => {
        saveState(store.getState())
    }, 1000))

    return store
}