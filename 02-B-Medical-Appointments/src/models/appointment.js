// src/models/appointment.js
// Modelo para operaciones CRUD de turnos

const { readDatabase, writeDatabase } = require('../database/connection');

function formatDate(value) {
  if (value instanceof Date) {
    return value.toISOString().slice(0, 10);
  }
  return value;
}

function formatTime(value) {
  if (value instanceof Date) {
    return value.toISOString().slice(11, 16);
  }
  return value;
}

function sortAppointments(a, b) {
  if (a.date === b.date) {
    return a.time.localeCompare(b.time);
  }
  return a.date.localeCompare(b.date);
}

/**
 * Obtiene todos los turnos ordenados por fecha y hora
 * @returns {Promise<Array>} Lista de turnos con información del paciente
 */
async function getAllAppointments() {
  const db = await readDatabase();
  return db.appointments
    .map(appointment => {
      const patient = db.patients.find(patientItem => patientItem.id === appointment.patientId) || {};
      return {
        id: appointment.id,
        patientId: appointment.patientId,
        patientName: `${patient.firstName || ''} ${patient.lastName || ''}`.trim(),
        patientDni: patient.dni || '',
        date: appointment.date,
        time: appointment.time,
        specialty: appointment.specialty
      };
    })
    .sort(sortAppointments);
}

/**
 * Obtiene un turno por ID
 * @param {number} id - ID del turno
 * @returns {Promise<Object|null>} Turno o null si no existe
 */
async function getAppointmentById(id) {
  const db = await readDatabase();
  const appointment = db.appointments.find(item => item.id === id);
  if (!appointment) {
    return null;
  }

  const patient = db.patients.find(patientItem => patientItem.id === appointment.patientId) || {};
  return {
    id: appointment.id,
    patientId: appointment.patientId,
    patientName: `${patient.firstName || ''} ${patient.lastName || ''}`.trim(),
    patientDni: patient.dni || '',
    date: appointment.date,
    time: appointment.time,
    specialty: appointment.specialty
  };
}

/**
 * Crea un nuevo turno
 * @param {Object} appointmentData - Datos del turno
 * @returns {Promise<number>} ID del turno creado
 */
async function createAppointment(appointmentData) {
  const db = await readDatabase();

  const newAppointment = {
    id: db.nextAppointmentId++,
    patientId: appointmentData.patientId,
    date: formatDate(appointmentData.date),
    time: formatTime(appointmentData.time),
    specialty: appointmentData.specialty
  };

  db.appointments.push(newAppointment);
  await writeDatabase(db);
  return newAppointment.id;
}

/**
 * Actualiza un turno
 * @param {number} id - ID del turno
 * @param {Object} appointmentData - Datos actualizados
 * @returns {Promise<boolean>} true si se actualizó, false si no existe
 */
async function updateAppointment(id, appointmentData) {
  const db = await readDatabase();
  const index = db.appointments.findIndex(item => item.id === id);
  if (index === -1) {
    return false;
  }

  db.appointments[index] = {
    ...db.appointments[index],
    patientId: appointmentData.patientId,
    date: formatDate(appointmentData.date),
    time: formatTime(appointmentData.time),
    specialty: appointmentData.specialty
  };

  await writeDatabase(db);
  return true;
}

/**
 * Elimina un turno
 * @param {number} id - ID del turno
 * @returns {Promise<boolean>} true si se eliminó, false si no existe
 */
async function deleteAppointment(id) {
  const db = await readDatabase();
  const index = db.appointments.findIndex(item => item.id === id);
  if (index === -1) {
    return false;
  }

  db.appointments.splice(index, 1);
  await writeDatabase(db);
  return true;
}

module.exports = {
  getAllAppointments,
  getAppointmentById,
  createAppointment,
  updateAppointment,
  deleteAppointment
};