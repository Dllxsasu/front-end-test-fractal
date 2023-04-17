import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { TextField, Button, Container, Typography } from '@material-ui/core';
import ProductService from '../../services/ProductService';
import {useNavigate, useParams} from 'react-router-dom';
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
  const { id } = useParams();
  const operation = id?'edit':'add';

  const [name, setName] = useState('');
  const [unitPrice, setUnitPrice] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
        ProductService.getById(id)
        .then(response => {          
            setName(response.data.name);
            setUnitPrice(response.data.price);
            
        })
        .catch(error => {

            console.log(error.response);
            console.log(error.request);

            // Error
        if (error.response.status ===404) {
            alert('The product does not exist ');
            navigate('/product', {replace: true});
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            // console.log(error.response.data);
            // console.log(error.response.status);
            // console.log(error.response.headers);
        } else if (error.request) {
            // The request was made but no response was received
            // `error.request` is an instance of XMLHttpRequest in the 
            // browser and an instance of
            // http.ClientRequest in node.js
            console.log(error.request);
        } else {
            // Something happened in setting up the request that triggered an Error
            console.log('Error', error.message);
        }
        console.log(error.config);
           
        });
    }
  }, [id]);


  const handleSubmit = (event) => {
    //Validators
    event.preventDefault();
    if (name  == "") {
      alert('Please insert the name of the product.');
     return;
    }
    if (unitPrice  == "") {
      alert('Please insert the price.');
      return;
    }
    if (unitPrice <= 0) {
      alert('The price has to be greater than 0.');
      return;
    }

    var data = {
        name: name,
        price: unitPrice
    }; 

    if(id){
       
        ProductService.update(id,data).
        then(rsp => {
            alert("save success");
             navigate('/product', {replace: true});
        }, error =>{
            if (error.response.status ===400) {
                alert("bad request");
            }
        });
    }else{
   

   
    

    ProductService.create(data)
            .then(response => {

             
                navigate('/product', {replace: true});
            //    history.push('/products');
            alert("the register was successful")
                console.log(response.data);
            })
            .catch(error => {
                if (error.response.status ===400) {
                    alert("bad request");
                }
                console.log(error);
            });

        }
        event.preventDefault();
      
  };

  return (
    <Container> 
        <Typography variant="h4" className={classes.title}>
       {operation} product 
      </Typography>
    <form className={classes.form} onSubmit={handleSubmit}>
      <TextField
        label="Product Name"
        className={classes.input}
        value={name}
        onChange={(event) => setName(event.target.value)}
        required
      />
      <TextField
        label="Unit Price"
        className={classes.input}
        type="number"
        value={unitPrice}
        onChange={(event) => setUnitPrice(event.target.value)}
        required
      />
      
      <Button variant="contained" color="primary" className={classes.button} type="submit">
        Save
      </Button>
    </form>
    </Container>
  );
};

export default ProductForm;