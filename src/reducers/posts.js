import {
    ADD_POST,
    REMOVE_POST,
    SET_POSTS,
    SET_ALL_POSTS,
    EDIT_POST
} from '../actions/posts'

const postsReducerDefaultState = []

const postsReducer = (state = postsReducerDefaultState, action) => {
    switch (action.type) {
        case ADD_POST:
            return [
                ...state,
                action.post
            ]
        case REMOVE_POST:
            return state.filter(({ id }) => id !== action.id)
        case EDIT_POST:
            return state.map((post) => {
                if (post.id === action.id) {
                    return {
                        ...post,
                        ...action.updates
                    }
                } else {
                    return post
                }
            })
        case SET_POSTS:
        case SET_ALL_POSTS:
            return action.posts
        default:
            return state
    }
}

export default postsReducer