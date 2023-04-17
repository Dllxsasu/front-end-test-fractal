import React, { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Button } from '@mui/material';


function TableProducts({ editf, deletef,  data }){

    function edit(row){

    }

return(  
     <TableContainer component={Paper}>
    <Table sx={{ minWidth: 650 }} >
      <TableHead>
        <TableRow>
          <TableCell>ID</TableCell>            
          <TableCell align="right">Product </TableCell>
            <TableCell align="right">Price</TableCell>            
            <TableCell align="right">Quantity</TableCell>  
            <TableCell align="right">Total price</TableCell>     
            <TableCell align="right">Edit</TableCell>
            <TableCell align="right">Delete</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {data.filter((row) =>  row.idStatus !== -1).map((row) => (
          <TableRow key={row.id}>
            <TableCell component="th" scope="row">
              {row.idDetail}
            </TableCell>
            <TableCell align="right">{row.name}</TableCell>
            <TableCell align="right">{row.price}</TableCell>
            <TableCell align="right">{row.quantity}</TableCell>
            <TableCell align="right">{row.totalPrice}</TableCell>
            <TableCell align="right">
                <Button onClick={ ()=> editf(row)}> Edit</Button>
              </TableCell>
              <TableCell align="right">
                <Button  onClick={() => {deletef(row.id)}} color="secondary">Delete</Button>
              </TableCell>
          </TableRow>
          
        ))}
      </TableBody>
    </Table>
   
  </TableContainer>);
}

export default TableProducts;