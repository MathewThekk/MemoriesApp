import mongoose from "mongoose"
import PostMessage from "../models/postMessage.js"

export const getPosts = async (req, res) => {
    try {
        const postMessages = await PostMessage.find()
        res.status(200).json(postMessages)
    }
    catch (error) {
        res.status(404).json({ message: error.message })
    }
}
export const createPost = async (req, res) => {
    console.log(req)
    const newPost = new PostMessage(req.body)
    try {
        await newPost.save()
        res.status(200).json(newPost)

    }
    catch (error) {
        res.status(409).json({ message: error.message })
    }
}
export const editPost = async (req, res) => {

    const { id: _id } = req.params
    if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No post with that Id')
    const post = req.body
    const updatedPost = await PostMessage.findByIdAndUpdate(_id, { ...post }, { new: true })
    res.json(updatedPost)

}
export const deletePost = async (req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with that Id')
    PostMessage.findByIdAndDelete(id, function (err, docs) {
        if (err) {
            console.log(err)
        }
        else {
            console.log("Deleted : ", docs);
        }
    });

    res.json({ message: "post deleted" })

}
export const likePost = async (req, res) => {

    const { id: _id } = req.params
    if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No post with that Id')
    const post = await PostMessage.findById(_id)
    const updatedPost = await PostMessage.findByIdAndUpdate(_id, { likeCount: post.likeCount + 1 }, { new: true })
    res.json(updatedPost)

}

