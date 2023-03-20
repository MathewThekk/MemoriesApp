import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import FileBase from 'react-file-base64';

import useStyles from './formStyles';
import { createPost, updatePost } from '../../actions/postsActions';

const Form = ({ currentId, setCurrentId }) => {
  const [postData, setPostData] = useState({  title: '', message: '', tags: '', selectedFile: '' });
  const post = useSelector((state) => (currentId ? state.posts.posts.find((p) => p._id === currentId) : null));
  const userStatus = useSelector((state) => (state.auth.authData));
  const dispatch = useDispatch();
  const classes = useStyles();
  let user = JSON.parse(localStorage.getItem('profile'));

  useEffect(() => {
    console.log(userStatus)
    if (post) setPostData(post);

  }, [post, userStatus]);

  const clear = () => {
    setCurrentId(0);
    setPostData({ title: '', message: '', tags: '', selectedFile: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (currentId === 0) {
      dispatch(createPost({ ...postData, name: user?.result?.name }));
      clear();
    } else {
      dispatch(updatePost({ ...postData, name: user?.result?.name }));
      clear();
    }

  };

  if (!user?.result) {
    return (
      <Paper className={classes.paper}>
        <Typography variant="h6" align="center">
          Please Sign In to create your own memories and like other's memories.
        </Typography>
      </Paper>
    );
  }

  return (
    <Paper className={classes.paper}>
      <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
        <Typography variant="h6">{currentId? 'Editing Memory' : 'Creating a Memory'}</Typography>

        <TextField name="title" variant="outlined" label="Title" fullWidth value={postData.title} onChange={(e) => setPostData({ ...postData, title: e.target.value })} />
        <TextField name="message" variant="outlined" label="Message" fullWidth multiline minrows={4} value={postData.message} onChange={(e) => setPostData({ ...postData, message: e.target.value })} />
        <TextField name="tags" variant="outlined" label="Tags (coma separated)" fullWidth value={postData.tags} onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(',') })} />
        <div className={classes.fileInput}><FileBase type="file" multiple={false} onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })} /></div>
        <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
        <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>
      </form>
    </Paper>
  );
};

export default Form;