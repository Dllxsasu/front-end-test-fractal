import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Typography, TextField, Button, Select, MenuItem } from '@material-ui/core';

import ProductService from '../services/ProductService';
import {useNavigate, useParams} from 'react-router-dom';
import AddProductModal from './product/AddProductModal';
import TableProducts from './TableProducts';
import OrderService from '../services/OrderService';
import { STATUS } from '../core/constans';
import EditOrderDetail from './EditOrderDetail';

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

const OrderForm = () => {
  const classes = useStyles();
  const { id } = useParams();  const operation = id?'edit':'add';
  const [status, setStatus] = useState(STATUS.PENDING);
  const [name, setName] = useState('');

  const navigate = useNavigate();
  const [products,setProducts]= useState([]);
  const [totalPrice,setTotalPrice]= useState(0);
  const [orderDetail, setOrderDetail] = useState([]);
  const [orderDate, setOrderDate] = useState(new Date().toISOString().substr(0, 10));
 
  useEffect(() => {

    ProductService.get()
    .then(response =>{
      setProducts(response.data);
    } )
    .catch(error => console.error(error));  

    if (id) {
        OrderService.getById(id)
        .then(response => {   
          console.log(response.data)  
          setTotalPrice(response.data.total)      
          setOrderDate(response.data.date);
          setStatus(response.data.status);
          setOrderDetail(response.data.details);           
        })
        .catch(error => {

            console.log(error);
            console.log(error.request);

            // Error
        if (error.response.status ===404) {
            alert('The Order not found, rediring to my-order ');
            navigate('/my-orders', {replace: true});
         
        } else if (error.request) {

            console.log(error.request);
        } else {    
            console.log('Error', error.message);
        }
        console.log(error.config);
           
        });
    }
  }, [id]);


  const handleSubmit = (event) => {
    var data = {
        date: orderDate,
        total: totalPrice,
        details:orderDetail,
        status:status
    }; 

    if(id){
       
      OrderService.update(id,data)
        .then(rsp => {
          console.log(data);
          console.log(rsp);
            alert("Succesful edit");
             navigate('/my-orders', {replace: true});
        }, error =>{
            if (error.response.status ===400) {
                alert("bad request");
            }
        });
    }else{
    OrderService.create(data)
            .then(response => {             
            navigate('/my-orders', {replace: true});
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

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalEditOpen, setIsModalEditOpen] = useState(false);
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSaveProduct = ({ productId, quantity }) => {

    addOrdeDetail({ productId, quantity }, orderDetail, products, );
   //products[-1]
  alert("it's added");
  updateTotalPrice();
    setIsModalOpen(false);
  };
 // const handleSaveProduct =
  const editOrderDetailF =  (row) =>{
    alert("Not implement")
    //setIsModalEditOpen(true);
  }
  const deleteOrderDetail =  (idP) =>{
    const index = orderDetail.findIndex(item => item.id === idP);

    if(id){
      orderDetail[index].idStatus =-1;
     // products.push(orderDetail[index]);
      
      setProducts(products);
      setOrderDetail( orderDetail);
      console.log(orderDetail)
    }else{
      if (index !== -1) {
       
        products.push(orderDetail[index]);
        orderDetail.splice(index, 1);
      
        const x=orderDetail.filter(i => i.id != idP);

        setOrderDetail(x);
      
      
      }
    }
    updateTotalPrice();
  }
  function addOrdeDetail(obj, arrAdd,arrDel){
    
    const index = arrDel.findIndex(item => item.id === obj.productId);
    console.log(index)
    console.log(arrDel)

      if (index !== -1) {
        arrDel[index].idStatus = 0;
        arrDel[index].quantity = parseInt(obj.quantity);
        arrDel[index].totalPrice = obj.quantity* arrDel[index].price ;
        console.log( arrDel[index]);
        arrAdd.push(arrDel[index]);
        
        arrDel.splice(index, 1);
        //setOrderDetail(arrDel);
        console.log(arrDel)
      }
      return index;
}
function updateTotalPrice(){

  let totalPrice = orderDetail
  .filter(i => i.idStatus !== -1)
  .map(item => item.totalPrice)
  .reduce((acc, curr) => acc + curr, 0);
setTotalPrice(totalPrice);
}
  return (
    <Container> 
        <Typography variant="h4" className={classes.title}>
       {operation} order 
      </Typography>
    <form className={classes.form} onSubmit={handleSubmit}>
     
      
      <TextField
        label="#products"
        className={classes.input}
        value={orderDetail.length}
      
        disabled
      />
      <TextField
        label="Total price"
        className={classes.input}
        value={totalPrice}
        disabled
      />
       <TextField
          id="order-date"
          label="Date"
          type="date"
          value={orderDate}
        
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
          disabled
        />
     
      <Select
        label="Status"
        className={classes.input}
        value={status}
        disabled={id?false:true} 
        onChange={(event) => setStatus(event.target.value)}
      >
        <MenuItem value={STATUS.PENDING}>PENDING</MenuItem>
        <MenuItem  value={STATUS.PROGRESS}>PROGRESS</MenuItem>
        <MenuItem  value={STATUS.COMPLETE}>COMPLETE</MenuItem>
       
      </Select>
      
      <Button variant="contained" color="primary" onClick={handleOpenModal}>
        Add Product
      </Button>
      <AddProductModal
        products={products}
        open={isModalOpen}
        onClose={handleCloseModal}
        onSave={handleSaveProduct}
      />
       <EditOrderDetail
        products={products}
        open={isModalEditOpen}
          product={{id:1,quantity:2}}
        onClose={()=> setIsModalEditOpen(false)}
        onSave={handleSaveProduct}
      />
      <TableProducts deletef={deleteOrderDetail} editf={editOrderDetailF} data={orderDetail} />
      <Button variant="contained" color="primary" className={classes.button} type="submit">
        Save
      </Button>
    </form>
    </Container>
  );
};

export default OrderForm;