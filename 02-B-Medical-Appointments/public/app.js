// public/app.js
// Lógica del frontend para la aplicación de turnera médica

// Variables globales
let patients = [];
let appointments = [];

// Funciones de navegación
function showHome() {
    document.getElementById('homePage').style.display = 'block';
    document.getElementById('appointmentsTable').style.display = 'none';
}

function showPatientModal() {
    loadPatientsForSelect();
    const modal = new bootstrap.Modal(document.getElementById('patientModal'));
    modal.show();
}

function showAppointmentModal() {
    loadPatientsForSelect();
    setMinDate();
    const modal = new bootstrap.Modal(document.getElementById('appointmentModal'));
    modal.show();
}

function showAppointmentsTable() {
    document.getElementById('homePage').style.display = 'none';
    document.getElementById('appointmentsTable').style.display = 'block';
    loadAppointments();
}

// Cargar pacientes para el selector
async function loadPatientsForSelect() {
    try {
        const response = await fetch('/api/patients');
        if (response.ok) {
            patients = await response.json();
            const select = document.getElementById('patientSelect');
            select.innerHTML = '<option value="">Seleccione un paciente...</option>';

            patients.forEach(patient => {
                const option = document.createElement('option');
                option.value = patient.id;
                option.textContent = `${patient.lastName}, ${patient.firstName} (DNI: ${patient.dni})`;
                select.appendChild(option);
            });
        } else {
            console.error('Error al cargar pacientes');
        }
    } catch (error) {
        console.error('Error de red:', error);
    }
}

// Establecer fecha mínima para turnos (hoy)
function setMinDate() {
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('appointmentDate').min = today;
}

// Guardar paciente
async function savePatient() {
    const firstName = document.getElementById('firstName').value.trim();
    const lastName = document.getElementById('lastName').value.trim();
    const dni = document.getElementById('dni').value.trim();
    const phone = document.getElementById('phone').value.trim();

    // Validaciones del frontend
    if (!firstName || !lastName || !dni || !phone) {
        alert('Todos los campos son obligatorios');
        return;
    }

    if (isNaN(dni) || dni.length < 7 || dni.length > 9) {
        alert('El DNI debe ser numérico y tener entre 7 y 9 dígitos');
        return;
    }

    try {
        const response = await fetch('/api/patients', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                firstName,
                lastName,
                dni,
                phone
            })
        });

        const result = await response.json();

        if (response.ok) {
            alert('Paciente registrado exitosamente');
            document.getElementById('patientForm').reset();
            bootstrap.Modal.getInstance(document.getElementById('patientModal')).hide();
        } else {
            alert(result.error || 'Error al registrar paciente');
        }
    } catch (error) {
        console.error('Error de red:', error);
        alert('Error de conexión');
    }
}

// Guardar turno
async function saveAppointment() {
    const patientId = document.getElementById('patientSelect').value;
    const date = document.getElementById('appointmentDate').value;
    const time = document.getElementById('appointmentTime').value;
    const specialty = document.getElementById('specialty').value;

    // Validaciones del frontend
    if (!patientId || !date || !time || !specialty) {
        alert('Todos los campos son obligatorios');
        return;
    }

    // Validar fecha no en el pasado
    const appointmentDateTime = new Date(`${date}T${time}`);
    const now = new Date();
    if (appointmentDateTime < now) {
        alert('No se pueden crear turnos en fechas pasadas');
        return;
    }

    try {
        const response = await fetch('/api/appointments', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                patientId: parseInt(patientId),
                date,
                time,
                specialty
            })
        });

        const result = await response.json();

        if (response.ok) {
            alert('Turno registrado exitosamente');
            document.getElementById('appointmentForm').reset();
            bootstrap.Modal.getInstance(document.getElementById('appointmentModal')).hide();
            if (document.getElementById('appointmentsTable').style.display !== 'none') {
                loadAppointments();
            }
        } else {
            alert(result.error || 'Error al registrar turno');
        }
    } catch (error) {
        console.error('Error de red:', error);
        alert('Error de conexión');
    }
}

// Cargar y mostrar turnos
async function loadAppointments() {
    try {
        const response = await fetch('/api/appointments');
        if (response.ok) {
            appointments = await response.json();
            displayAppointments();
        } else {
            console.error('Error al cargar turnos');
        }
    } catch (error) {
        console.error('Error de red:', error);
    }
}

function displayAppointments() {
    const tbody = document.getElementById('appointmentsTableBody');
    tbody.innerHTML = '';

    if (appointments.length === 0) {
        tbody.innerHTML = '<tr><td colspan="6" class="text-center">No hay turnos programados</td></tr>';
        return;
    }

    appointments.forEach(appointment => {
        const row = document.createElement('tr');

        // Formatear fecha
        const date = new Date(appointment.date);
        const formattedDate = date.toLocaleDateString('es-ES');

        // Formatear hora
        const time = appointment.time.substring(0, 5); // HH:MM

        row.innerHTML = `
            <td>${appointment.patientName}</td>
            <td>${appointment.patientDni}</td>
            <td>${formattedDate}</td>
            <td>${time}</td>
            <td>${appointment.specialty}</td>
            <td>
                <button class="btn btn-sm btn-outline-danger" onclick="deleteAppointment(${appointment.id})">
                    <i class="bi bi-trash"></i> Eliminar
                </button>
            </td>
        `;

        tbody.appendChild(row);
    });
}

// Eliminar turno
async function deleteAppointment(id) {
    if (!confirm('¿Está seguro de que desea eliminar este turno?')) {
        return;
    }

    try {
        const response = await fetch(`/api/appointments/${id}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            alert('Turno eliminado exitosamente');
            loadAppointments();
        } else {
            const result = await response.json();
            alert(result.error || 'Error al eliminar turno');
        }
    } catch (error) {
        console.error('Error de red:', error);
        alert('Error de conexión');
    }
}

// Inicialización cuando se carga la página
document.addEventListener('DOMContentLoaded', function() {
    // Configurar fecha mínima para turnos
    setMinDate();

    // Cargar pacientes inicialmente
    loadPatientsForSelect();
});