import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:3000' });

API.interceptors.request.use((req) => {
  if (localStorage.getItem('profile')) {
    req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
  }

  return req;
});

export const fetchPostsByPage = (page)=> API.get(`/posts?page=${page}`);
export const fetchPostsBySearch = (searchQuery)=> API.get(`/posts/search?searchquery=${searchQuery.search || 'none'}&tags=${searchQuery.tags || 'none'}`)
export const createPost = (postData)=> API.post('/posts',postData)
export const updatePost = (postData)=> API.patch(`${'/posts'}/${postData._id}`,postData)
export const deletePost = (id)=> API.delete(`${'/posts'}/${id}`)
export const likePost = (id)=> API.patch(`${'/posts'}/${id}/likePost`)

export const signIn = (formData) => API.post('/user/signin', formData);
export const signUp = (formData) => API.post('/user/signup', formData);