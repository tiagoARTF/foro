const mongoose = require('mongoose');


// Modelo de libros
const libroSchema = new mongoose.Schema({
    libroId: { type: mongoose.Schema.Types.ObjectId, ref: 'Libros'},
    titulo: { type: String, index: true},
    autor: { type: String, index: true},
    publicacion: String,
    portada: String,
    // Otros campos relevantes para tus libros
});

// Agregar índice de texto compuesto para búsqueda en "titulo" y "autor"
libroSchema.index({ titulo: 'text', autor: 'text' });

const LibroModel = mongoose.model("Libros", libroSchema);

module.exports = {
    LibroModel,
    isBrowser: false
};
