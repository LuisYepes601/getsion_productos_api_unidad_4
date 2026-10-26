const mongoose = require('mongoose');

const productoSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  sku: { type: String, required: true, unique: true },
  precio: { type: Number, required: true },
  stock: { type: Number, default: 0 },
  descripcion: { type: String, default: '' },
  imagenUrl: { type: String, default: '' },
  categoria: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Categoria', 
    required: true 
  },
  marca: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Marca', 
    required: true 
  }
}, { timestamps: true });

module.exports = mongoose.model('Producto', productoSchema);