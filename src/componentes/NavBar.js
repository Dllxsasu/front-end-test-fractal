import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ProductList from './ProductList';
import OrderList from './OrderList';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
    textDecoration: 'none',
    color: 'inherit',
  },
  button: {
    textDecoration: 'none',
    color: 'inherit',
    margin: theme.spacing(1),
  },
}));

const Nav = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            <Link to="/" className={classes.title}>My App</Link>
          </Typography>
          <Link  to="/product" className={classes.button}>Product List</Link>
          <Link   to="/order" className={classes.button}>Order List</Link>
                    <Link   to="/product/add" className={classes.button}>Order List</Link>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Nav;