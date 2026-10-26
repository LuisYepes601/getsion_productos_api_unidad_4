const mongoose = require('mongoose');

const marcaSchema = new mongoose.Schema({
  nombre: { type: String, required: true, unique: true },
  paisOrigen: { type: String, default: 'Desconocido' }
}, { timestamps: true });

module.exports = mongoose.model('Marca', marcaSchema);