import * as api from '../api/api.js'
import { CREATE_POST, FETCH_POSTS_BY_PAGE,FETCH_POSTS_BY_SEARCH, UPDATE_POST,DELETE_POST, LIKE_POST  } from "../constants/actionTypeConstants";


// export const getPosts = () => async (dispatch) => {
//     try {
//         const { data } = await api.fetchPost()
//         const action = { type: FETCH_ALL, payload: data }
//         dispatch(action)

//     } catch (error) {
//         console.log(error)


//     }
// }
export const getPostsByPage = (page) => async (dispatch) => {
    try {
        console.log('action page',page)
        const { data } = await api.fetchPostsByPage(page)
        console.log(data)
        const action = { type: FETCH_POSTS_BY_PAGE, payload: data }
        dispatch(action)

    } catch (error) {
        console.log(error)


    }
}
export const getPostsBySearch = (searchQuery) => async (dispatch) => {
    try {

       const {data : {data}} = await api.fetchPostsBySearch(searchQuery)

        const action = { type: FETCH_POSTS_BY_SEARCH, payload: data }
        dispatch(action)
    }
    catch (error) {
        console.log(error)
    }
}
export const createPost = (postData) => async (dispatch) => {
    try {

        const { data } = await api.createPost(postData)


        const action = { type: CREATE_POST, payload: data }
        dispatch(action)

    } catch (error) {
        console.log(error)

    }
}
export const updatePost = (postData) => async (dispatch) => {
    try {
        console.log('updating post')
        const { data } = await api.updatePost(postData)

        const action = { type: UPDATE_POST, payload: data }
        dispatch(action)

    } catch (error) {
        console.log(error)

    }
}
export const deletePost = (id) => async (dispatch) => {
    try {
        await api.deletePost(id)
        const action = { type: DELETE_POST, payload: id }
        dispatch(action)
    }
    catch (error) {
        console.log(error)
    }
}
export const likePost = (id) => async (dispatch) => {
    try {

       const {data} = await api.likePost(id)


        const action = { type: LIKE_POST, payload: data }
        dispatch(action)
    }
    catch (error) {
        console.log(error)
    }
}
