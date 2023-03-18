import mongoose from "mongoose";
import PostMessage from "../models/postMessage.js";

export const getPosts = async (req, res) => {
  try {
    const postMessages = await PostMessage.find();
    res.status(200).json(postMessages);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
export const createPost = async (req, res) => {
  const newPost = new PostMessage({ ...req.body, creator: req.userId, createdAt: new Date().toISOString() });
  console.log(newPost);
  try {
    await newPost.save();
    res.status(200).json(newPost);
  } catch (error) {
    console.log(error);
    res.status(409).json({ message: error.message });
  }
};
export const editPost = async (req, res) => {
  const { id: _id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send("No post with that Id");
  const post = req.body;
  const updatedPost = await PostMessage.findByIdAndUpdate(_id, { ...post }, { new: true });
  res.json(updatedPost);
};
export const deletePost = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send("No post with that Id");
  PostMessage.findByIdAndDelete(id, function (err, docs) {
    if (err) {
      console.log(err);
    } else {
      console.log("Deleted : ", docs);
    }
  });

  res.json({ message: "post deleted" });
};
export const likePost = async (req, res) => {
  const { id: _id } = req.params;
  if (!req.userId) return res.json({ message: "User not authenticated" });
  if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send("No post with that Id");
  let post = await PostMessage.findById(_id);

  const index = post.likes.findIndex((id) => id === String(req.userId));
  if (index === -1) {
    post.likes.push(req.userId);
  } else {
    post = post.likes.filter((id) => id !== String(req.userId));
  }
  const updatedPost = await PostMessage.findByIdAndUpdate(_id, post, { new: true });
  res.json(updatedPost);
};
