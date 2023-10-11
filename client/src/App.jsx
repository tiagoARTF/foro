import  {  } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import './App.css'
import Signup from './Signup'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Login from './Login';
import Home from './Home';
import Inicio from './Inicio';
import Libros from './Libros';
import DetallesLibro from './DetalleInteraction';
import Comentarios from './Comments';

function App() {
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/registro' element={<Signup />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/home' element={<Home />}></Route>
        <Route path='/inicio' element={<Inicio />}></Route>
        <Route path='/libros' element={<Libros />}></Route>
        <Route path='/libros/:_id' element={<DetallesLibro />}></Route>
        <Route path='/comentarios' element={<Comentarios />}></Route> 
      </Routes>
    </BrowserRouter>
  )
}

export default App


