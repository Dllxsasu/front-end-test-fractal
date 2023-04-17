import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Button } from '@mui/material';


import { Container, Typography, makeStyles } from '@material-ui/core';
import {useNavigate} from 'react-router-dom';
import ProductService from '../../services/ProductService';
import DeleteConfirmationModal from '../modals/DeleteConfirmationModal ';
const useStyles = makeStyles((theme) => ({
  title: {
    textAlign: 'center',
    margin: theme.spacing(4),
  },
  addButton: {
    margin: theme.spacing(2),
  },
}));

function ProductList(props) {
  const classes = useStyles();
  const navigate = useNavigate();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    ProductService.get()
        .then(response =>{
          setProducts(response.data);
          console.log(response.data);
        } )
        .catch(error => {
          
          console.error(error)
        });
    }, []);


  const handleProductDelete = () => {  
    ProductService.delete(selectedProduct.id).then(
      rsp=>{
        alert("Delete ok")

        setProducts(products.filter(i => i.id !== selectedProduct.id));
      },
      error=> {alert("error in delete")}
      ); 
    
    setIsDeleteModalOpen(false);
  };
  function editar(id){
    navigate('/product/add/'+id, {replace: true});
  }
  



  return (
    <Container>
      <Typography variant="h4" className={classes.title}>
        List of Products
      </Typography>
      <Button
        variant="contained"
        color="primary"
        className={classes.addButton}
        onClick={() => {
          navigate('/product/add', {replace: true});
          
        }}
      >
        Add New Product
      </Button>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} >
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>            
            <TableCell align="right">Product </TableCell>
              <TableCell align="right">Price</TableCell>              
              <TableCell align="right">Edit</TableCell>
              <TableCell align="right">Delete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products.map((row) => (
            <TableRow key={row.id}>
              <TableCell component="th" scope="row">
                {row.id}
              </TableCell>
              <TableCell align="right">{row.name}</TableCell>
              <TableCell align="right">{row.price}</TableCell>
           
              <TableCell align="right">
                  <Button onClick={ ()=> editar(row.id)}> Edit</Button>
                </TableCell>
                <TableCell align="right">
                  <Button  onClick={() => {
                    setSelectedProduct(row);
                    setIsDeleteModalOpen(true);
                  }} color="secondary">Delete</Button>
                </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <DeleteConfirmationModal
        open={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onDelete={handleProductDelete}
      />
    </TableContainer>
    </Container>
  );
}

export default ProductList;