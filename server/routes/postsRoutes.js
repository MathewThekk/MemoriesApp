import express from "express";
import { getPost, getPostsByPage, getPostsBySearch, createPost, editPost, deletePost, likePost, commentPost } from "../controllers/postsController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.get('/search', getPostsBySearch)
router.get('/',  getPostsByPage)
router.get('/:id',  getPost)
router.post('/', authMiddleware, createPost)
router.patch('/:id', authMiddleware, editPost)
router.delete('/:id', authMiddleware, deletePost)
router.patch('/:id/likePost',authMiddleware, likePost)
router.post('/:id/comment',authMiddleware, commentPost)


export default router 