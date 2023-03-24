import { CREATE_POST, UPDATE_POST, DELETE_POST, LIKE_POST, FETCH_POSTS_BY_SEARCH, FETCH_POSTS_BY_PAGE, START_LOADING, FINISHED_LOADING, FETCH_POST } from "../constants/actionTypeConstants";

export const postReducer = (state = { isLoading: true, posts: [] }, action) => {
  switch (action.type) {
    case START_LOADING:
      return { ...state, isLoading: true };
    case FINISHED_LOADING:
      return { ...state, isLoading: false };
    case FETCH_POSTS_BY_PAGE:
      return { ...state, posts: action.payload.data, numberOfPages: action.payload.numberOfPages, page: action.payload.page };
    case FETCH_POSTS_BY_SEARCH:
      return { ...state, posts: action.payload };
    case FETCH_POST:
      return { ...state, post: action.payload.post };
    case CREATE_POST:
      return { ...state, posts: [...state.posts, action.payload] };
    case UPDATE_POST:
      return { ...state, posts: state.posts.map((post) => (post._id === action.payload._id ? action.payload : post)) };
    case DELETE_POST:
      return { ...state, posts: state.posts.filter((post) => post.id !== action.payload.id) };
    case LIKE_POST:
      return { ...state, posts: state.posts.map((post) => (post._id === action.payload._id ? action.payload : post)) };
    default:
      return state;
  }
};
