import axios from 'axios'

const url = 'http://localhost:3000/auth'

export const signUp = (userLoginData)=> axios.post(url,userLoginData)