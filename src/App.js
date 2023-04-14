import logo from './logo.svg';
import './App.css';
import OrderList from './componentes/OrderList';

import ProductList from './componentes/ProductList';
import ProductForm from './componentes/ProductForm';
import NavBar from './componentes/NavBar';
import { Router, Routes } from 'react-router-dom';
import {   Route } from 'react-router-dom';

function App() {
  return (
  
    <div>
      <NavBar />
      <Routes >
        <Route exact path="/" element={<ProductList/>} />
        <Route path="/product" element={ <ProductList/>} />
        <Route path="/product/add" element={ <ProductForm/>} />
        <Route path="/order" element={<OrderList></OrderList>} />
      </Routes>
    </div>
 
  );
}

export default App;
