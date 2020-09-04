import database from '../firebase/firebase'
export const ADD_POST = 'ADD_POST'
export const REMOVE_POST = 'REMOVE_POST'
export const EDIT_POST = 'EDIT_POST'
export const SET_POSTS = 'SET_POSTS'
export const SET_ALL_POSTS = 'SET_ALL_POSTS'

export const addPost = (post) => ({
    type: ADD_POST,
    post
})

export const startAddPost = (postData = {}) => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid
        const {
            body = '',
            title = '',
            createdAt = 0,
            author = uid
        } = postData
        const post = { body, title, createdAt, author }

        return database.ref(`users/${uid}/posts`).push(post).then((ref) => {
            dispatch(addPost({
                id: ref.key,
                ...post
            }))
        })
    }
}

export const removePost = ({ id } = {}) => ({
    type: REMOVE_POST,
    id
})

export const startRemovePost = ({ id } = {}) => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid
        return database.ref(`users/${uid}/posts/${id}`).remove().then(() => {
            dispatch(removePost({ id }))
        })
    }
}

export const editPost = (id, updates) => ({
    type: EDIT_POST,
    id,
    updates
})

export const startEditPost = (id, updates) => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid
        return database.ref(`users/${uid}/posts/${id}`).update(updates).then(() => {
            dispatch(editPost(id, updates))
        })
    }
}

export const setPosts = (posts) => ({
    type: SET_POSTS,
    posts
})

export const startSetPosts = () => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid
        return database.ref(`users/${uid}/posts`).once('value').then((snapshot) => {
            const posts = []
            snapshot.forEach((childSnapshot) => {
                posts.push({
                    id: childSnapshot.key,
                    ...childSnapshot.val()
                })
            })
            dispatch(setPosts(posts))
        })
    }
}


export const setAllPosts = (posts) => ({
    type: SET_ALL_POSTS,
    posts
})

export const startSetAllPosts = () => {
    return (dispatch) => {
        return database.ref('users').once('value').then((snapshot) => {
            const posts = []
            snapshot.forEach((childSnapshot) => {
                let userPosts = childSnapshot.val().posts
                if (userPosts) {
                    for (const [key, value] of Object.entries(userPosts)) {
                        posts.push({
                            id: key,
                            ...value
                        })
                    }
                }
            })
            dispatch(setAllPosts(posts))
        })
    }
}