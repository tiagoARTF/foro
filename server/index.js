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

  
  // Backend (Node.js)


/*app.post('/login', (req, res) => {
  const { email, password } = req.body;
  EmployeeModel.findOne({ email: email })
    .then(user => {
      if (user) {
        if (user.password === password) {
          // Crear automáticamente un perfil de usuario con el nombre de usuario
          const userProfile = new UserProfileModel({
            username: user.name, // O el campo que contiene el nombre de usuario
            // Otros campos del perfil
          });
          userProfile.save()
            .then(() => {
              res.json("Exitoso");
            })
            .catch(err => {
              console.error('Error al crear el perfil del usuario', err);
              res.json("Error al crear el perfil del usuario");
            });
        } else {
          res.json("La contraseña es incorrecta");
        }
      } else {
        res.json("No existe ningún registro");
      }
    })
    .catch(error => {
      console.error('Error al iniciar sesión', error);
      res.json("Error al iniciar sesión");
    });
});*/