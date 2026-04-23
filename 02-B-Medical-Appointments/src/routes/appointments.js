// src/routes/appointments.js
// Rutas para gestión de turnos

const express = require('express');
const router = express.Router();
const appointmentModel = require('../models/appointment');
const patientModel = require('../models/patient');

// GET /api/appointments - Obtener todos los turnos
router.get('/', async (req, res) => {
  try {
    const appointments = await appointmentModel.getAllAppointments();
    res.json(appointments);
  } catch (error) {
    console.error('Error al obtener turnos:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// GET /api/appointments/:id - Obtener un turno por ID
router.get('/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ error: 'ID inválido' });
    }

    const appointment = await appointmentModel.getAppointmentById(id);
    if (!appointment) {
      return res.status(404).json({ error: 'Turno no encontrado' });
    }

    res.json(appointment);
  } catch (error) {
    console.error('Error al obtener turno:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// POST /api/appointments - Crear un nuevo turno
router.post('/', async (req, res) => {
  try {
    const { patientId, date, time, specialty } = req.body;

    // Validaciones
    if (!patientId || !date || !time || !specialty) {
      return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }

    // Verificar que el paciente existe
    const patient = await patientModel.getPatientById(parseInt(patientId));
    if (!patient) {
      return res.status(400).json({ error: 'El paciente seleccionado no existe' });
    }

    // Validar fecha (no en el pasado)
    const appointmentDate = new Date(date + 'T' + time);
    const now = new Date();
    if (appointmentDate < now) {
      return res.status(400).json({ error: 'No se pueden crear turnos en fechas pasadas' });
    }

    const appointmentData = {
      patientId: parseInt(patientId),
      date: appointmentDate,
      time: appointmentDate,
      specialty: specialty.trim()
    };

    const id = await appointmentModel.createAppointment(appointmentData);
    res.status(201).json({ id, message: 'Turno creado exitosamente' });
  } catch (error) {
    console.error('Error al crear turno:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// PUT /api/appointments/:id - Actualizar un turno
router.put('/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ error: 'ID inválido' });
    }

    const { patientId, date, time, specialty } = req.body;

    // Validaciones
    if (!patientId || !date || !time || !specialty) {
      return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }

    // Verificar que el paciente existe
    const patient = await patientModel.getPatientById(parseInt(patientId));
    if (!patient) {
      return res.status(400).json({ error: 'El paciente seleccionado no existe' });
    }

    // Validar fecha (no en el pasado)
    const appointmentDate = new Date(date + 'T' + time);
    const now = new Date();
    if (appointmentDate < now) {
      return res.status(400).json({ error: 'No se pueden crear turnos en fechas pasadas' });
    }

    const appointmentData = {
      patientId: parseInt(patientId),
      date: appointmentDate,
      time: appointmentDate,
      specialty: specialty.trim()
    };

    const updated = await appointmentModel.updateAppointment(id, appointmentData);
    if (!updated) {
      return res.status(404).json({ error: 'Turno no encontrado' });
    }

    res.json({ message: 'Turno actualizado exitosamente' });
  } catch (error) {
    console.error('Error al actualizar turno:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// DELETE /api/appointments/:id - Eliminar un turno
router.delete('/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ error: 'ID inválido' });
    }

    const deleted = await appointmentModel.deleteAppointment(id);
    if (!deleted) {
      return res.status(404).json({ error: 'Turno no encontrado' });
    }

    res.json({ message: 'Turno eliminado exitosamente' });
  } catch (error) {
    console.error('Error al eliminar turno:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

module.exports = router;