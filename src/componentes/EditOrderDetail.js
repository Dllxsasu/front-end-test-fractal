import React, { useState } from "react";
import {
  Button,
  Modal,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
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
  const [productId, setProductId] = useState(product.id);
  const [quantity, setQuantity] = useState(product.quantity);
  const PRODUCTS =products;
  const handleProductChange = (event) => {
    setProductId(event.target.value);
  };

  const handleQuantityChange = (event) => {
    setQuantity(event.target.value);
  };

  const handleSubmit = (event) => {
 //   event.preventDefault();
 if (!productId  <= 0) {
    alert('Please select a product.');
    return;
  }

  if (quantity > 0) {
    alert('The quantity has to be greater than 0.');
    return;
  }
    onSave({ productId, quantity });
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
            margin="normal"
          />
          <Button variant="contained" color="primary" onClick={()=>handleSubmit()} type="submit" disabled={!productId || !quantity || quantity <= 0}>
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