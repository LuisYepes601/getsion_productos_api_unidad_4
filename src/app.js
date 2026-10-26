const express = require('express');
const cors = require('cors');

const authRoutes = require('./features/auth/auth.routes');
const categoriaRoutes = require('./features/categorias/categoria.routes');
const marcaRoutes = require('./features/marcas/marca.routes');
const productoRoutes = require('./features/productos/producto.routes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/categorias', categoriaRoutes);
app.use('/api/marcas', marcaRoutes);
app.use('/api/productos', productoRoutes);

module.exports = app;