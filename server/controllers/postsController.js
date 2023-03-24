import mongoose from "mongoose";
import PostMessage from "../models/postMessage.js";

// export const getPosts = async (req, res) => {
//   try {
//     const postMessages = await PostMessage.find();
//     res.status(200).json(postMessages);
//   } catch (error) {
//     res.status(404).json({ message: error.message });
//   }
// };

export const getPost = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await PostMessage.findById(id);
    res.status(200).json({ post });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
export const getPostsByPage = async (req, res) => {
  try {
    const { page } = req.query;
    const limit = 5;
    const startIndex = (Number(page) - 1) * limit; //get the starting index of every page
    const totalPosts = await PostMessage.countDocuments();
    const post = await PostMessage.find().sort({ _id: -1 }).limit(limit).skip(startIndex);
    const numberOfPages = Math.ceil(totalPosts / limit);
    res.status(200).json({ data: post, currentPage: page, numberOfPages: numberOfPages });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getPostsBySearch = async (req, res) => {
  const { searchquery, tags } = req.query;

  try {
    const title = new RegExp(searchquery, "i");
    console.log(title);

    const posts = await PostMessage.find({ $or: [{ title: title }, { tags: { $in: tags.split(",") } }] });

    res.json({ data: posts });
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
    post.likes = post.likes.filter((id) => id !== String(req.userId));
  }
  console.log(post);
  const updatedPost = await PostMessage.findByIdAndUpdate(_id, post, { new: true });
  console.log(updatedPost);
  res.json(updatedPost);
};
