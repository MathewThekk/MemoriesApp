
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Posts from '../Posts/Posts';
import Form from '../Form/Form';
import { Container,Grow, Grid } from '@material-ui/core';
import useStyles from './homeStyles';
import { getPosts } from '../../actions/postsActions';

const Home = () => {
    const allposts = useSelector((state)=> state.posts)
  const [currentId, setCurrentId] = useState(0);
  const dispatch = useDispatch();    
  const classes = useStyles();

  useEffect(()=> {

    dispatch(getPosts())
  
  },[currentId, dispatch, allposts.length])
  

  return (
    <Grow in>
    <Container>
      <Grid className={classes.mainContainer} container justifyContent="space-between" alignItems="stretch" spacing={3}>
        <Grid item xs={12} sm={7}>
          <Posts setCurrentId={setCurrentId}/> 
        </Grid>
        <Grid item xs={12} sm={4}>
          <Form currentId={currentId} setCurrentId={setCurrentId}/>
        </Grid>
      </Grid>
    </Container>
  </Grow>
  )
}

export default Home