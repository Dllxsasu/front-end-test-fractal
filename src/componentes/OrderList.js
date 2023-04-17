import React, { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Button } from '@mui/material';
import DeleteConfirmationModal from "./modals/DeleteConfirmationModal ";
import OrderService from "../services/OrderService";
import { Container, Typography, makeStyles } from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import { STATUS } from "../core/constans";
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
const navigate = useNavigate();
const [selectedItem, setSelectedItem] = useState(null);
const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
const [orders, setOrders] = useState([]);
useEffect(() => {
  OrderService.get()
    .then(response =>{
        setOrders(response.data);
    
    } )
    .catch(error => console.error(error));
}, []);


const handleDelete = () => {  
    if(validStatus(selectedItem.status,2) ){
       console.log(selectedItem)
    OrderService.delete(selectedItem.id).then(
      rsp=>{
        console.log(rsp);
        alert("Delete ok")

        setOrders(orders.filter(i => i.id !== selectedItem.id));
      },
      error=> {alert("error in delete")}
      ); 
    
    setIsDeleteModalOpen(false);
    }
  };
  function editar(row){
    if(validStatus(row.status)){
        navigate('/add-order/'+row.id, {replace: true});
    }
   
  }

  const handleAddProduct = (product, qty) => {
    
  };

  function validStatus(status,op=1){
    var valid = status != STATUS.COMPLETE;

    if(valid==false){
        var msg = "";
        switch(op){
            case 1:
                msg="IT CANNOT BE DELETED SINCE THE ORDER IS ALREADY COMPLETED             ";
                break;
            case 2: 
                msg="IT CANNOT BE DELETED SINCE THE ORDER IS ALREADY COMPLETED                ";
                break;
                default:break;
        }
        alert(msg)

    }
    return valid;
  }


 
  return (
    <Container>
      <Typography variant="h4" className={classes.title}>
        My orders
      </Typography>
      <Button
        variant="contained"
        color="primary"
        className={classes.addButton}
        onClick={() => {
            navigate('/add-order', {replace: true});
            
          }}
      >
        Add New Order
      </Button>
    
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} >
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
                  <Button  onClick={()=> {editar(row)}}>Edit</Button>
                </TableCell>
                <TableCell align="right">
                  <Button onClick={() => {
                    setSelectedItem(row);
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
        onDelete={handleDelete}
      />
    </TableContainer>
    </Container>
  );
}

export default OrderList;