import { CREATE_POST,UPDATE_POST,DELETE_POST, LIKE_POST, FETCH_POSTS_BY_SEARCH, FETCH_POSTS_BY_PAGE  } from "../constants/actionTypeConstants";

export const postReducer = (state = [], action) => {
    switch (action.type) {
        case FETCH_POSTS_BY_PAGE:
            return {...state, posts:action.payload.data, numberOfPages:action.payload.numberOfPages, page:action.payload.page}
        case FETCH_POSTS_BY_SEARCH:
            return {...state, posts:action.payload}
        case CREATE_POST:
            return {...state, posts:action.payload}
        case UPDATE_POST:
            return state.map((post) => post._id === action.payload._id ? action.payload : post)
        case DELETE_POST:
            return state.filter(post => post.id !== action.payload.id)
        case LIKE_POST:
            return state.map((post) => post._id === action.payload._id ? action.payload : post)
        default:
            return state;
    }
}