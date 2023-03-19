import React, { useState, useEffect } from 'react';
import { Container, Grow, Grid, AppBar, TextField, Button, Paper } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import ChipInput from 'material-ui-chip-input';

// import { getPostsBySearch } from '../../actions/posts';
import Posts from '../Posts/Posts';
import Form from '../Form/Form';
// import Pagination from '../Pagination';
import useStyles from './homeStyles';
import { getPosts } from '../../actions/postsActions';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}


const Home = () => {
  const classes = useStyles();
  const dispatch = useDispatch();    
  const query = useQuery();
  const page = query.get('page') || 1;
  const searchQuery = query.get('searchQuery');

    const allposts = useSelector((state)=> state.posts)
  const [currentId, setCurrentId] = useState(0);
  

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