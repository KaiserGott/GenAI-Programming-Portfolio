// src/routes/patients.js
// Rutas para gestión de pacientes

const express = require('express');
const router = express.Router();
const patientModel = require('../models/patient');

// GET /api/patients - Obtener todos los pacientes
router.get('/', async (req, res) => {
  try {
    const patients = await patientModel.getAllPatients();
    res.json(patients);
  } catch (error) {
    console.error('Error al obtener pacientes:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// GET /api/patients/:id - Obtener un paciente por ID
router.get('/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ error: 'ID inválido' });
    }

    const patient = await patientModel.getPatientById(id);
    if (!patient) {
      return res.status(404).json({ error: 'Paciente no encontrado' });
    }

    res.json(patient);
  } catch (error) {
    console.error('Error al obtener paciente:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// POST /api/patients - Crear un nuevo paciente
router.post('/', async (req, res) => {
  try {
    const { firstName, lastName, dni, phone } = req.body;

    // Validaciones
    if (!firstName || !lastName || !dni || !phone) {
      return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }

    if (isNaN(dni) || dni.toString().length < 7 || dni.toString().length > 9) {
      return res.status(400).json({ error: 'DNI debe ser numérico y válido' });
    }

    const patientData = {
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      dni: dni.toString().trim(),
      phone: phone.trim()
    };

    const id = await patientModel.createPatient(patientData);
    res.status(201).json({ id, message: 'Paciente creado exitosamente' });
  } catch (error) {
    console.error('Error al crear paciente:', error);
    if (error.message && error.message.includes('UNIQUE')) {
      res.status(409).json({ error: 'Ya existe un paciente con ese DNI' });
    } else {
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  }
});

// PUT /api/patients/:id - Actualizar un paciente
router.put('/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ error: 'ID inválido' });
    }

    const { firstName, lastName, dni, phone } = req.body;

    // Validaciones
    if (!firstName || !lastName || !dni || !phone) {
      return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }

    if (isNaN(dni) || dni.toString().length < 7 || dni.toString().length > 9) {
      return res.status(400).json({ error: 'DNI debe ser numérico y válido' });
    }

    const patientData = {
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      dni: dni.toString().trim(),
      phone: phone.trim()
    };

    const updated = await patientModel.updatePatient(id, patientData);
    if (!updated) {
      return res.status(404).json({ error: 'Paciente no encontrado' });
    }

    res.json({ message: 'Paciente actualizado exitosamente' });
  } catch (error) {
    console.error('Error al actualizar paciente:', error);
    if (error.message && error.message.includes('UNIQUE')) {
      res.status(409).json({ error: 'Ya existe un paciente con ese DNI' });
    } else {
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  }
});

// DELETE /api/patients/:id - Eliminar un paciente
router.delete('/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ error: 'ID inválido' });
    }

    const deleted = await patientModel.deletePatient(id);
    if (!deleted) {
      return res.status(404).json({ error: 'Paciente no encontrado' });
    }

    res.json({ message: 'Paciente eliminado exitosamente' });
  } catch (error) {
    console.error('Error al eliminar paciente:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

module.exports = router;