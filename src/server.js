require('dotenv').config();
const app = require('./app');
const connectDB = require('./config/db');

const PORT = process.env.PORT || 3000;

// Primero se conecta a MongoDB y luego inicia el servidor
connectDB().then(() => {
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Servidor activo en http://localhost:${PORT}`);
    console.log(`📱 Base de Endpoints para Android: http://10.0.2.2:${PORT}/api`);
  });
});