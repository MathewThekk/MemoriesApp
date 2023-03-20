/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Pagination, PaginationItem } from '@material-ui/lab';
import { Link } from 'react-router-dom';

import { getPostsByPage } from '../actions/postsActions';
import useStyles from './paginationStyles';

const Paginate = ({ page }) => {
  const dispatch = useDispatch();
  const classes = useStyles();

  useEffect(() => {
    console.log(2)

  }, []);

  console.log(1);
  
  return (
    <Pagination
      // classes={{ ul: classes.ul }}
      count={1}
      page={Number(page) || 1}
      variant="outlined"
      color="primary"
      // renderItem={(item) => (
      //   <PaginationItem {...item} component={Link} to={`/posts?page=${item.page}`} />
      // )}
    />
  );
};

export default Paginate;