import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Button } from '@mui/material';
import DeleteConfirmationModal from './modals/DeleteConfirmationModal ';
import ProductService from './services/ProductService';
import { Container, Typography, makeStyles } from '@material-ui/core';

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

 
  const handleDelete = (index) => {
    const newOrders = [...props.orders];
    newOrders.splice(index, 1);
    props.setOrders(newOrders);
  };
  const [selectedProduct, setSelectedProduct] = useState(null);
const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
const [products, setProducts] = useState([]);
useEffect(() => {
  ProductService.get()
    .then(response =>{
      setProducts(response.data);
      console.log(response.data);
    } )
    .catch(error => console.error(error));
}, []);


  const handleProductDelete = () => {
    
    console.log("le dio a eliminar");
    setIsDeleteModalOpen(false);
  };
  const classes = useStyles();

  const rows = [
    { id: 1, name: 'John Doe', price: 1 },
    { id: 2, name: 'Jane Smith', price: 23},
    { id: 3, name: 'Bob Johnson', price: 45 },
    // Agrega más filas según sea necesario
  ];
  return (
    <Container>
      <Typography variant="h4" className={classes.title}>
        List of Products
      </Typography>
      <Button
        variant="contained"
        color="primary"
        className={classes.addButton}
        onClick={() => console.log('Add product button clicked')}
      >
        Add New Product
      </Button>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="Tabla de datos">
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
                  <Button>Edit</Button>
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