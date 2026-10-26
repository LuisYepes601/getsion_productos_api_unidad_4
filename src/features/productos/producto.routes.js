const express = require('express');
const router = express.Router();
const { 
  getProductos, 
  getProductoById, 
  createProducto, 
  updateProducto, 
  deleteProducto 
} = require('./producto.controller');

// Importamos el middleware centralizado de Cloudinary
const { upload } = require('../../config/cloudinary');

router.get('/', getProductos);
router.get('/:id', getProductoById);

// Procesa el formulario y la imagen directamente en la misma petición
router.post('/', upload.single('imagen'), createProducto);
router.put('/:id', upload.single('imagen'), updateProducto);

router.delete('/:id', deleteProducto);

module.exports = router;