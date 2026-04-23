// src/server.js
// Servidor principal de la aplicación

const express = require('express');
const path = require('path');
const { initializeDatabase, closeConnection } = require('./database/connection');
const patientsRoutes = require('./routes/patients');
const appointmentsRoutes = require('./routes/appointments');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servir archivos estáticos
app.use(express.static(path.join(__dirname, '../public')));

// Rutas de la API
app.use('/api/patients', patientsRoutes);
app.use('/api/appointments', appointmentsRoutes);

// Ruta principal
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

// Manejo de errores 404
app.use((req, res) => {
  res.status(404).send('Página no encontrada');
});

// Manejo de errores generales
app.use((error, req, res, next) => {
  console.error('Error no manejado:', error);
  res.status(500).send('Error interno del servidor');
});

// Inicialización del servidor
async function startServer() {
  try {
    // Inicializar base de datos
    await initializeDatabase();

    // Iniciar servidor
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en http://localhost:${PORT}`);
    });

    // Manejo de cierre graceful
    process.on('SIGINT', async () => {
      console.log('Cerrando servidor...');
      await closeConnection();
      process.exit(0);
    });

    process.on('SIGTERM', async () => {
      console.log('Cerrando servidor...');
      await closeConnection();
      process.exit(0);
    });

  } catch (error) {
    console.error('Error al iniciar el servidor:', error);
    process.exit(1);
  }
}

// Iniciar la aplicación
startServer();