import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { TextField, Button, Container, Typography } from '@material-ui/core';
import ProductService from './services/ProductService';
import {useNavigate} from 'react-router-dom';
const useStyles = makeStyles((theme) => ({
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  input: {
    margin: theme.spacing(1),
    width: '100%',
  },
  button: {
    margin: theme.spacing(1),
  },
}));

const ProductForm = () => {
  const classes = useStyles();
  const [name, setName] = useState('');
  const [unitPrice, setUnitPrice] = useState('');
  const navigate = useNavigate();
  const handleSubmit = (event) => {
    console.log("se hizo algo", name);
    var data = {
        name: name,
        price: unitPrice
    }; 
    var titlex = "Add";
    ProductService.create(data)
            .then(response => {

             
                navigate('/product', {replace: true});
            //    history.push('/products');
            alert("the register was successful")
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    event.preventDefault();
    // handle form submission here
  };

  return (
    <Container> 
        <Typography variant="h4" className={classes.title}>
       Add product 
      </Typography>
    <form className={classes.form} onSubmit={handleSubmit}>
      <TextField
        label="Product Name"
        className={classes.input}
        value={name}
        onChange={(event) => setName(event.target.value)}
      />
      <TextField
        label="Unit Price"
        className={classes.input}
        value={unitPrice}
        onChange={(event) => setUnitPrice(event.target.value)}
      />
      <Button variant="contained" color="primary" className={classes.button} type="submit">
        Submit
      </Button>
    </form>
    </Container>
  );
};

export default ProductForm;