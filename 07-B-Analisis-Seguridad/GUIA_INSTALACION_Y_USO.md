# 📖 GUÍA DE INSTALACIÓN Y USO

## 🔧 Instalación de Dependencias

### 1. Requisitos Previos
- Python 3.8 o superior
- pip (gestor de paquetes de Python)

### 2. Instalar Dependencias

```bash
# Opción 1: Instalar desde requirements.txt
pip install -r requirements.txt

# Opción 2: Instalar manualmente
pip install bcrypt python-dotenv
```

### 3. Verificar Instalación

```bash
python -c "import bcrypt; print(f'✓ bcrypt {bcrypt.__version__} instalado')"
python -c "import dotenv; print('✓ python-dotenv instalado')"
```

---

## 📝 Configuración del Archivo .env

### 1. Crear archivo .env

```bash
# Copiar el template
cp .env.example .env

# Editar con tus valores
notepad .env  # Windows
# o
nano .env     # Linux/Mac
```

### 2. Contenido del .env

```env
# Base de datos
DATABASE_PATH=sistema_produccion.db

# Credenciales (se leen desde aquí en lugar de hardcodeadas)
DB_ADMIN_USER=admin_root
DB_ADMIN_PASSWORD=TuPasswordSeguro123!

# Configuración adicional (opcional)
DEBUG=False
LOG_LEVEL=INFO
```

### ⚠️ IMPORTANTE: No commitear .env

```bash
# Ya está en .gitignore, pero verifica:
cat .gitignore | grep .env

# Resultado esperado:
# .env
# .env.local
```

---

## 🚀 Uso del Código

### Ejemplo 1: Registrar Usuario

```python
from Codigo_Base_Primitivo import generar_hash_seguro

# Crear contraseña del usuario
password = input("Ingrese contraseña: ")

# Generar hash seguro
try:
    hash_seguro = generar_hash_seguro(password)
    print(f"Hash generado: {hash_seguro}")
    # Guardar en BD
except ValueError as e:
    print(f"Error: {e}")
```

### Ejemplo 2: Verificar Login

```python
from Codigo_Base_Primitivo import verificar_acceso

# Hash almacenado en BD (ejemplo)
hash_bd = "$2b$12$R9h7cIPz0gi.URNNGG3h.OPST9/PgBkqquzi.Ss7KIUgO2t0jvFm"

# Contraseña ingresada
password = input("Ingrese contraseña: ")

# Verificar
if verificar_acceso(password, hash_bd):
    print("✓ Acceso permitido")
else:
    print("✗ Contraseña incorrecta")
```

### Ejemplo 3: Conectar a BD

```python
from Codigo_Base_Primitivo import conectar_base_datos

try:
    conexion = conectar_base_datos()
    print("✓ Conectado a base de datos")
    
    # Usar conexión
    cursor = conexion.cursor()
    cursor.execute("SELECT COUNT(*) FROM usuarios")
    cantidad = cursor.fetchone()[0]
    print(f"Total de usuarios: {cantidad}")
    
    conexion.close()
    
except Exception as e:
    print(f"✗ Error: {e}")
```

### Ejemplo 4: Verificar Conexión a Servidor

```python
from Codigo_Base_Primitivo import verificar_conexion_servidor

# IP válida
ips_prueba = ["8.8.8.8", "1.1.1.1", "invalid_ip"]

for ip in ips_prueba:
    try:
        resultado = verificar_conexion_servidor(ip)
        estado = "✓ Alcanzable" if resultado else "✗ No alcanzable"
        print(f"{ip}: {estado}")
    except ValueError as e:
        print(f"{ip}: Error - {e}")
```

---

## 🧪 Pruebas de Seguridad

### Test 1: Validación de Entrada

```python
from Codigo_Base_Primitivo import validar_direccion_ip

# Casos válidos
ips_validas = ["192.168.1.1", "8.8.8.8", "127.0.0.1"]
for ip in ips_validas:
    try:
        if validar_direccion_ip(ip):
            print(f"✓ {ip} es válida")
    except ValueError as e:
        print(f"✗ {ip} - {e}")

# Casos inválidos (deben fallar)
ips_invalidas = ["256.256.256.256", "abc.def.ghi.jkl", "ping; rm -rf /"]
for ip in ips_invalidas:
    try:
        validar_direccion_ip(ip)
        print(f"✗ FALLO: {ip} NO fue detectada como inválida")
    except ValueError as e:
        print(f"✓ {ip} - Correctamente rechazada: {e}")
```

### Test 2: Hashing de Contraseña

```python
from Codigo_Base_Primitivo import generar_hash_seguro, verificar_acceso

# Generar hash
password = "MiPassword123"
hash1 = generar_hash_seguro(password)
hash2 = generar_hash_seguro(password)

print(f"Hash 1: {hash1}")
print(f"Hash 2: {hash2}")
print(f"¿Hashes iguales? {hash1 == hash2}")  # False (diferentes salts)
print(f"¿Ambos verifican contraseña? {verificar_acceso(password, hash1)} y {verificar_acceso(password, hash2)}")  # True y True
```

### Test 3: Prevención de Command Injection

```python
from Codigo_Base_Primitivo import verificar_conexion_servidor

# Intentar injection (debe fallar)
intentos_injection = [
    "; rm -rf /",
    "8.8.8.8'; cat /etc/passwd; echo '",
    "$(whoami)",
    "`id`",
]

for intento in intentos_injection:
    try:
        resultado = verificar_conexion_servidor(intento)
        print(f"✗ FALLO DE SEGURIDAD: {intento} fue ejecutado")
    except ValueError as e:
        print(f"✓ Injection bloqueada: {intento}")
```

---

## 🔍 Verificar Vulnerabilidades en Dependencias

```bash
# Usar pip-audit para escanear vulnerabilidades
pip install pip-audit
pip-audit
```

Salida esperada:
```
No known security vulnerabilities found
```

---

## 📊 Estructura de Archivos

```
07-B-Analisis-Seguridad/
├── Codigo_Base_Primitivo.py      # Código corregido ✅
├── .env.example                   # Template de configuración
├── .env                           # Variables reales (NO commitear)
├── .gitignore                     # Ignorar .env y otros
├── requirements.txt               # Dependencias del proyecto
├── ANALISIS_VULNERABILIDADES.md   # Análisis detallado
├── EJEMPLOS_USO_SEGURO.md        # Ejemplos de uso
├── RESUMEN_VULNERABILIDADES.md    # Resumen ejecutivo
└── GUIA_INSTALACION_Y_USO.md     # Este archivo
```

---

## ✅ Checklist Antes de Usar en Producción

- [ ] Instalar todas las dependencias
- [ ] Crear archivo .env con valores reales
- [ ] Verificar que .env esté en .gitignore
- [ ] Ejecutar pruebas de seguridad
- [ ] Revisar ANALISIS_VULNERABILIDADES.md
- [ ] Validar que no hay errores al importar módulo
- [ ] Probar con casos reales
- [ ] Ejecutar pip-audit para vulnerabilidades

---

## 🆘 Troubleshooting

### Error: "No module named 'bcrypt'"

```bash
pip install bcrypt
```

### Error: "No module named 'dotenv'"

```bash
pip install python-dotenv
```

### Error: ".env no encontrado"

```bash
cp .env.example .env
# Editar .env con valores reales
```

### Error: "Base de datos no encontrada"

Asegurar que DATABASE_PATH en .env apunta a un archivo existente:
```bash
# Crear BD vacía
touch sistema_produccion.db
```

---

## 📚 Lecturas Recomendadas

1. **ANALISIS_VULNERABILIDADES.md** - Detalles de cada vulnerabilidad
2. **EJEMPLOS_USO_SEGURO.md** - Cómo usar las funciones correctamente
3. **RESUMEN_VULNERABILIDADES.md** - Vista general ejecutiva

---

## 🔐 Reglas de Oro

```
✅ Siempre:
   • Validar entrada de usuario
   • Usar librería segura para hashing
   • Leer credenciales de variables de entorno
   • Documentar código de seguridad
   • Mantener dependencias actualizadas

❌ Nunca:
   • Hardcodear secretos
   • Usar MD5/SHA1 para contraseñas
   • Ejecutar comandos shell con entrada del usuario
   • Confiar en la entrada sin validar
   • Commitear archivo .env
```

---

## 📞 Soporte

Para más información:
- Documentación bcrypt: https://github.com/pyca/bcrypt
- OWASP: https://owasp.org/
- Python Security: https://python.readthedocs.io/

