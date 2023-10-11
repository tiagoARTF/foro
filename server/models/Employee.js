const mongoose = require('mongoose');

// Modelo de empleados
const employeeSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
});

const EmployeeModel = mongoose.model("Employees", employeeSchema);

// Modelo de libros
const libroSchema = new mongoose.Schema({
    titulo: String,
    autor: String,
    publicacion: String,
    portada: String,
    // Otros campos relevantes para tus libros
});

const LibroModel = mongoose.model("Libros", libroSchema);

module.exports = {
    EmployeeModel,
    LibroModel
};
