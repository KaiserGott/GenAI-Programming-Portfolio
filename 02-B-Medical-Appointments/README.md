# Turnera Médica

Aplicación web completa de gestión de turnos médicos construida con arquitectura de 3 capas.

## Descripción

Esta aplicación permite a un centro médico registrar pacientes y asignar turnos en una agenda persistente. Utiliza una arquitectura limpia separando el frontend, la API backend y el acceso a datos.

## Características

- **Gestión de Pacientes**: Registro de pacientes con nombre, apellido, DNI y teléfono
- **Gestión de Turnos**: Asignación de turnos con fecha, hora y especialidad
- **Visualización**: Tabla ordenada cronológicamente de todos los turnos
- **Validaciones**: Todos los campos obligatorios, DNI numérico, no turnos en fechas pasadas
- **Persistencia**: Datos guardados en un archivo JSON local

## Tecnologías Utilizadas

- **Frontend**: Bootstrap 5 (CDN) + JavaScript Vanilla (ES6+)
- **Backend**: Node.js + Express.js
- **Persistencia**: Archivo JSON local (`data/db.json`)

## Arquitectura

```
Capa 1 (Frontend)
├── public/
│   ├── index.html
│   └── app.js

Capa 2 (API/Backend)
├── src/
│   ├── server.js
│   └── routes/
│       ├── patients.js
│       └── appointments.js

Capa 3 (Acceso a Datos)
├── src/
│   ├── database/
│   │   └── connection.js
│   └── models/
│       ├── patient.js
│       └── appointment.js
```

## Requisitos Previos

1. **Node.js** (versión 14 o superior)

## Instalación

1. Clona o descarga este repositorio
2. Navega al directorio del proyecto:
   ```bash
   cd 03-Medical-Appointments
   ```

3. Instala las dependencias de Node.js:
   ```bash
   npm install
   ```

## Ejecución

1. Inicia el servidor:
   ```bash
   npm start
   ```
   o
   ```bash
   node src/server.js
   ```

2. Abre tu navegador y ve a:
   ```
   http://localhost:3000
   ```

3. La aplicación estará lista para usar.

## Uso de la Aplicación

### Registrar Paciente
1. Haz clic en "Registrar Paciente" en la barra de navegación
2. Completa todos los campos obligatorios
3. Haz clic en "Guardar Paciente"

### Crear Turno
1. Haz clic en "Agenda de Turnos" en la barra de navegación
2. Haz clic en "Nuevo Turno"
3. Selecciona un paciente registrado
4. Elige fecha (no puede ser pasada), hora y especialidad
5. Haz clic en "Guardar Turno"

### Ver Agenda
- La tabla muestra todos los turnos ordenados por fecha y hora
- Incluye información del paciente, fecha, hora y especialidad

## Persistencia de Datos

Los datos se guardan automáticamente en el archivo JSON local `data/db.json`.
La carpeta `data` se crea al iniciar la aplicación por primera vez.

## API Endpoints

### Pacientes
- `GET /api/patients` - Obtener todos los pacientes
- `GET /api/patients/:id` - Obtener paciente por ID
- `POST /api/patients` - Crear nuevo paciente
- `PUT /api/patients/:id` - Actualizar paciente
- `DELETE /api/patients/:id` - Eliminar paciente

### Turnos
- `GET /api/appointments` - Obtener todos los turnos
- `GET /api/appointments/:id` - Obtener turno por ID
- `POST /api/appointments` - Crear nuevo turno
- `PUT /api/appointments/:id` - Actualizar turno
- `DELETE /api/appointments/:id` - Eliminar turno

## Validaciones

- **Campos obligatorios**: Todos los campos deben completarse
- **DNI**: Debe ser numérico (7-9 dígitos)
- **Fechas**: No se permiten turnos en fechas pasadas
- **Pacientes**: Deben estar registrados antes de asignar turnos

## Desarrollo

Para desarrollo, puedes usar:
```bash
npm run dev
```

## Solución de Problemas

### Errores de instalación
- Ejecuta `npm install` en el directorio `03-Medical-Appointments`
- Asegúrate de tener Node.js instalado

### Puerto ocupado
- Cambia el puerto en `src/server.js` si el 3000 está ocupado

## Licencia

Este proyecto es de uso educativo.