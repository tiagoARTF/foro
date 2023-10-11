const express = require("express")
const mongoose = require('mongoose')
const cors = require("cors")
const { EmployeeModel, LibroModel } = require('./models/Employee');


const app = express()
app.use(express.json())
app.use(cors())

mongoose.connect("mongodb+srv://neitan:1234@foro.qs1fmh1.mongodb.net/employee");



app.post("/login", (req, res) => {
    const {email, password} = req.body;
    EmployeeModel.findOne({email: email})
    .then(user => {
        if(user){
            if(user.password === password) {
                res.json("Exitoso")
            } else {
                res.json("La contraseña es incorrecta")
            }   
        } else{
            res.json("No existe ningún registro")
        }
    })
})


app.post('/registro', (req, res) => {
    EmployeeModel.create(req.body)
        .then(employess => res.json(employess))
        .catch(err => res.json(err))
})

app.get('/libros', (req, res) => {
    LibroModel.find({})
        .then(libros => res.json(libros))
        .catch(err => res.json(err));
})

app.get('/libros/:id', (req, res) => {
    const libroId = req.params.id;
  
    // Utiliza mongoose para buscar el libro por ID en la base de datos
    LibroModel.findById(libroId)
      .then(libro => {
        if (libro) {
          // Si se encuentra el libro, lo enviamos como respuesta
          res.json(libro);
        } else {
          // Si no se encuentra el libro, respondemos con un error 404
          res.status(404).json({ error: 'Libro no encontrado' });
        }
      })
      .catch(err => {
        // Manejo de errores en caso de problemas en la búsqueda
        console.error('Error al buscar el libro', err);
        res.status(500).json({ error: 'Error del servidor' });
      });
  });

app.listen(3001, () => {
    console.log("server is running")
})