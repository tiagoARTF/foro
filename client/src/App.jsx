import  {  } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import './App.css'
import Signup from './Signup'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Login from './Login';
import Home from './Home';
import Inicio from './Inicio';

function App() {
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/registro' element={<Signup />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/home' element={<Home />}></Route>
        <Route path='/inicio' element={<Inicio />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App


