import axios from 'axios'

const url = 'http://localhost:3000/posts'

export const fetchPost = ()=> axios.get(url)
export const createPost = (postData)=> axios.post(url,postData)
export const updatePost = (postData)=> axios.patch(`${url}/${postData._id}`,postData)
export const deletePost = (id)=> axios.delete(`${url}/${id}`)
export const likePost = (id)=> axios.patch(`${url}/${id}/likePost`)

