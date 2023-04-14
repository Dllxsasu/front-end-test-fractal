import React, { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Button } from '@mui/material';
import DeleteConfirmationModal from "./modals/DeleteConfirmationModal ";
import OrderService from "./services/OrderService";
import { Container, Typography, makeStyles } from "@material-ui/core";
const useStyles = makeStyles((theme) => ({
    title: {
      textAlign: 'center',
      margin: theme.spacing(4),
    },
    addButton: {
      margin: theme.spacing(2),
    },
  }));

function OrderList(props) {
  /*
    const handleDelete = (index) => {
    const newOrders = [...props.orders];
    newOrders.splice(index, 1);
    props.setOrders(newOrders);
  };
*/
const classes = useStyles();

const [selectedProduct, setSelectedProduct] = useState(null);
const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
const [orders, setOrders] = useState([]);
useEffect(() => {
  OrderService.get()
    .then(response =>{
        setOrders(response.data);
      console.log(response.data);
    } )
    .catch(error => console.error(error));
}, []);
  const handleProductDelete = () => {
   
    setIsDeleteModalOpen(false);
  };


 
  return (
    <Container>
      <Typography variant="h4" className={classes.title}>
        List of orders
      </Typography>
      <Button
        variant="contained"
        color="primary"
        className={classes.addButton}
        onClick={() => console.log('Add product button clicked')}
      >
        Add New Order
      </Button>
    
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="Tabla de datos">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>                      
              <TableCell align="right">Date</TableCell>
              <TableCell align="right"># Products</TableCell>
              <TableCell align="right">Final Price</TableCell>
              <TableCell align="right">Status</TableCell>
              <TableCell align="right">Edit</TableCell>
              <TableCell align="right">Delete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.map((row) => (
            <TableRow key={row.id}>
              <TableCell component="th" scope="row">
                {row.id}
              </TableCell>
              <TableCell align="right">{row.date}</TableCell>
              <TableCell align="right">{row.details.length}</TableCell>
              <TableCell align="right">{row.total}</TableCell>
              <TableCell align="right">{row.status}</TableCell>
              <TableCell align="right" color="primary">
                  <Button >Edit</Button>
                </TableCell>
                <TableCell align="right">
                  <Button onClick={() => {
                    setSelectedProduct(row);
                    setIsDeleteModalOpen(true);
                  }} color="secondary" >Delete</Button>
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

export default OrderList;