import logo from './logo.svg';
import './App.css';



import NavBar from './componentes/NavBar';
import { Router, Routes } from 'react-router-dom';
import {   Route } from 'react-router-dom';
import OrderForm from './componentes/OrderForm';
import OrderList from './componentes/OrderList';
import ProductList from './componentes/product/ProductList';
import ProductForm from './componentes/product/ProductForm';

function App() {
  return (
  
    <div>
      <NavBar />
      <Routes >
        <Route exact path="/" element={<ProductList/>} />
        <Route path="/product" element={ <ProductList/>} />
        <Route path="/product/add/:id?" element={ <ProductForm/>} />
        <Route path="/my-orders" element={<OrderList></OrderList>} />
        <Route path="/add-order/:id?" element={<OrderForm></OrderForm>} />
      </Routes>
    </div>
 
  );
}

export default App;
