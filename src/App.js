import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';
import Header from './Header.js';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import AddProducts from './AddProducts';
import UpdateProducts from './UpdateProducts';
import Protected from './Protected';

function App() {
  return (
   <div className="App">
   <BrowserRouter>
      <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/add" element={ <Protected Cmp={AddProducts} /> /*<AddProducts />*/} />
          <Route path="/update" element={ <Protected Cmp={UpdateProducts} /> /*<UpdateProducts />*/} />
      </Routes>
   </BrowserRouter>
   </div>
  );
}

export default App;
