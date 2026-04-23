// src/database/connection.js
// Persistencia simple en JSON para pacientes y turnos

const fs = require('fs').promises;
const path = require('path');

const dataDir = path.join(__dirname, '../data');
const dbFile = path.join(dataDir, 'db.json');

async function fileExists(filePath) {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

async function initializeDatabase() {
  try {
    await fs.mkdir(dataDir, { recursive: true });

    const exists = await fileExists(dbFile);
    if (!exists) {
      const initialData = {
        patients: [],
        appointments: [],
        nextPatientId: 1,
        nextAppointmentId: 1
      };
      await fs.writeFile(dbFile, JSON.stringify(initialData, null, 2), 'utf8');
    }

    console.log('Base de datos JSON inicializada correctamente');
  } catch (error) {
    console.error('Error al inicializar la base de datos:', error);
    throw error;
  }
}

async function readDatabase() {
  const raw = await fs.readFile(dbFile, 'utf8');
  return JSON.parse(raw);
}

async function writeDatabase(data) {
  await fs.writeFile(dbFile, JSON.stringify(data, null, 2), 'utf8');
}

async function closeConnection() {
  return;
}

module.exports = {
  initializeDatabase,
  readDatabase,
  writeDatabase,
  closeConnection
};