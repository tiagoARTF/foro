import  {  } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import './App.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import  SignIn  from './pages/SignIn';
import  SignUp  from './pages/SignUp';
import Inicio from './Inicio';
import Libros from './Libros';
import DetallesLibro from './DetalleInteraction';
//import Busqueda from './busqueda';
import FormularioClubLectura from '../src/components/clublectura';
//import Comentarios from './Comments';
//import UserProfile from './UserProfile';

function App() {
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/sign-up' element={<SignUp />}></Route>
        <Route path='/sign-in' element={<SignIn />}></Route>
        <Route path='/' element={<Inicio />}></Route>
        <Route path='/for' element={<FormularioClubLectura />}></Route>
        <Route path='/libros' element={<Libros />}></Route>
        <Route path='/libros/:_id' element={<DetallesLibro />}>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App


