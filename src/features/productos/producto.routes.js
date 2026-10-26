const express = require('express');
const router = express.Router();
const { 
  getProductos, 
  getProductoById, 
  createProducto, 
  updateProducto, 
  deleteProducto 
} = require('./producto.controller');

// Importamos el middleware de Cloudinary
const { upload } = require('../../config/cloudinary');

router.get('/', getProductos);
router.get('/:id', getProductoById);

// Middleware upload.single('imagen') para interceptar archivos adjuntos
router.post('/', upload.single('imagen'), createProducto);
router.put('/:id', upload.single('imagen'), updateProducto);
router.delete('/:id', deleteProducto);

module.exports = router;