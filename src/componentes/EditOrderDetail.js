import React, { useEffect, useState } from "react";
import {
  Button,
  Modal,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
 
  Box,
} from "@material-ui/core";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};


function EditOrderDetail({ open, onClose, onSave, products, product }) {
  const [productId, setProductId] = useState("");
  const [quantity, setQuantity] = useState("");
  const PRODUCTS =products;
  const handleProductChange = (event) => {
    setProductId(event.target.value);
  };

  const handleQuantityChange = (event) => {
    setQuantity(event.target.value);
  };
  useEffect(() => {
   
    setProductId(product.id);
    setQuantity(product.quantity);

    

  }, [product]);
  const handleSubmit = (eventx) => {
    eventx.preventDefault();
    if (productId  == "") {
      alert('Please select a product.');
      return;
    }
    if (quantity  == "") {
      alert('Please insert a quantity.');
      return;
    }
    if (quantity <= 0) {
      alert('The quantity has to be greater than 0.');
      return;
    }
    onSave({ productId, quantity,  });
    setProductId("");
    setQuantity("");
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={style}>
        <form onSubmit={handleSubmit}>
          <FormControl fullWidth margin="normal">
            <InputLabel id="product-label">Select Product</InputLabel>
            <Select
              labelId="product-label"
              id="product-select"
              value={productId}
              onChange={handleProductChange}
              fullWidth
              required
             disabled={true}
            >
              {PRODUCTS.map((product) => (
                <MenuItem key={product.id} value={product.id}>
                  {product.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            id="quantity"
            label="Quantity"
            type="number"
            value={quantity}
            onChange={handleQuantityChange}
            fullWidth
            required
            margin="normal"
          />
          <Button variant="contained" color="primary" onClick={(e)=>handleSubmit(e)} type="submit" >
            Save
          </Button>
          <Button variant="contained"  color="secondary" onClick={onClose}>
            Close
          </Button>
        </form>
      </Box>
    </Modal>
  );
}


export default EditOrderDetail;