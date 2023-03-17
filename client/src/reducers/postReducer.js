import { CREATE_POST, FETCH_ALL,UPDATE_POST,DELETE_POST, LIKE_POST  } from "../constants/actionTypeConstants";

export const postReducer = (posts = [], action) => {
    switch (action.type) {
        case FETCH_ALL:
            return action.payload;
        case CREATE_POST:
            return [...posts, action.payload]
        case UPDATE_POST:
            return posts.map((post) => post._id === action.payload._id ? action.payload : post)
        case DELETE_POST:
            return posts.filter(post => post.id !== action.payload.id)
        case LIKE_POST:
            return posts.map((post) => post._id === action.payload._id ? action.payload : post)
        default:
            return posts;
    }
}