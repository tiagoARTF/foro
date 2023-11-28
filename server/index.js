
const path = require("path");
const express = require("express");
const mongoose = require('mongoose');
const cors = require("cors");
const { LibroModel } = require('./models/Employee');


const app = express();

app.use(express.json());
app.use(cors());

mongoose.connect("mongodb+srv://neitan:1234@foro.qs1fmh1.mongodb.net/employee", { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Conexión exitosa a la base de datos");
  })
  .catch((error) => {
    console.error("Error de conexión a la base de datos:", error);
  });


// Ruta para obtener todos los libros
app.get('/libros', (req, res) => {
    LibroModel.find({})
        .then(libros => res.json(libros))
        .catch(err => res.json(err));
});

// Ruta para obtener detalles de un libro por ID
app.get('/libros/:id', (req, res) => {
    const libroId = req.params.id;
  
    LibroModel.findById(libroId)
      .then(libro => {
        if (libro) {
          res.json(libro);
        } else {
          res.status(404).json({ error: 'Libro no encontrado' });
        }
      })
      .catch(err => {
        console.error('Error al buscar el libro', err);
        res.status(500).json({ error: 'Error del servidor' });
      });
});

app.get('/libros/buscar/:query', (req, res) => {
  const query = req.params.query;
  
  LibroModel.find({ $or: [{ titulo: new RegExp(query, 'i') }, { autor: new RegExp(query, 'i') }] })
      .then(libros => {
          console.log('Libros encontrados:', libros);
          res.json(libros);
      })
      .catch(err => {
          console.error('Error al buscar libros por query:', err);
          res.status(500).json({ error: 'Error del servidor al buscar libros', details: err });
      });
});



app.listen(3001, () => {
    console.log("El servidor está en funcionamiento");
});

  
 