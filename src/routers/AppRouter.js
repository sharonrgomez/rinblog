import React from 'react'
import { Router, Route, Switch } from 'react-router-dom'
import { createBrowserHistory } from 'history'
import PostList from '../components/PostList'
import AddPostPage from '../components/AddPostPage'
import EditPostPage from '../components/EditPostPage'
import NotFoundPage from '../components/NotFoundPage'
import PrivateRoute from './PrivateRoute'
import PublicRoute from './PublicRoute'
import Header from '../components/Header'

export const history = createBrowserHistory()

const AppRouter = () => (
    <Router history={history}>
        <>
            <Header />
            <Switch>
                <PublicRoute path='/' component={() => <PostList listPage={'Home'} />} exact={true} />
                <PrivateRoute path='/me' component={() => <PostList listPage={'Your Posts'} />} />
                <PrivateRoute path='/create' component={AddPostPage} />
                <PrivateRoute path='/edit/:id' component={EditPostPage} />
                <Route component={NotFoundPage} />
            </Switch>
        </>
    </Router>
)

export default AppRouter