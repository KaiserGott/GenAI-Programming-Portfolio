// src/models/patient.js
// Modelo para operaciones CRUD de pacientes

const { readDatabase, writeDatabase } = require('../database/connection');

/**
 * Obtiene todos los pacientes
 * @returns {Promise<Array>} Lista de pacientes
 */
async function getAllPatients() {
  const db = await readDatabase();
  return db.patients
    .slice()
    .sort((a, b) => {
      const nameA = `${a.lastName.toLowerCase()} ${a.firstName.toLowerCase()}`;
      const nameB = `${b.lastName.toLowerCase()} ${b.firstName.toLowerCase()}`;
      return nameA.localeCompare(nameB);
    });
}

/**
 * Obtiene un paciente por ID
 * @param {number} id - ID del paciente
 * @returns {Promise<Object|null>} Paciente o null si no existe
 */
async function getPatientById(id) {
  const db = await readDatabase();
  return db.patients.find(patient => patient.id === id) || null;
}

/**
 * Crea un nuevo paciente
 * @param {Object} patientData - Datos del paciente
 * @returns {Promise<number>} ID del paciente creado
 */
async function createPatient(patientData) {
  const db = await readDatabase();

  if (db.patients.some(patient => patient.dni === patientData.dni)) {
    throw new Error('UNIQUE_DNI');
  }

  const newPatient = {
    id: db.nextPatientId++,
    firstName: patientData.firstName,
    lastName: patientData.lastName,
    dni: patientData.dni,
    phone: patientData.phone
  };

  db.patients.push(newPatient);
  await writeDatabase(db);
  return newPatient.id;
}

/**
 * Actualiza un paciente
 * @param {number} id - ID del paciente
 * @param {Object} patientData - Datos actualizados
 * @returns {Promise<boolean>} true si se actualizó, false si no existe
 */
async function updatePatient(id, patientData) {
  const db = await readDatabase();
  const index = db.patients.findIndex(patient => patient.id === id);
  if (index === -1) {
    return false;
  }

  if (db.patients.some(patient => patient.dni === patientData.dni && patient.id !== id)) {
    throw new Error('UNIQUE_DNI');
  }

  db.patients[index] = {
    ...db.patients[index],
    firstName: patientData.firstName,
    lastName: patientData.lastName,
    dni: patientData.dni,
    phone: patientData.phone
  };

  await writeDatabase(db);
  return true;
}

/**
 * Elimina un paciente
 * @param {number} id - ID del paciente
 * @returns {Promise<boolean>} true si se eliminó, false si no existe
 */
async function deletePatient(id) {
  const db = await readDatabase();
  const index = db.patients.findIndex(patient => patient.id === id);
  if (index === -1) {
    return false;
  }

  db.patients.splice(index, 1);
  db.appointments = db.appointments.filter(appointment => appointment.patientId !== id);
  await writeDatabase(db);
  return true;
}

module.exports = {
  getAllPatients,
  getPatientById,
  createPatient,
  updatePatient,
  deletePatient
};