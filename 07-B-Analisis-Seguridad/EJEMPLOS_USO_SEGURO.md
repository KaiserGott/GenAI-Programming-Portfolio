# Ejemplos de Uso Seguro

## 1. Generar hash de contraseña (Registro de usuario)

```python
from Codigo_Base_Primitivo import generar_hash_seguro

# Crear una nueva contraseña segura
password_usuario = "MiPassword123Seguro!"
hash_seguro = generar_hash_seguro(password_usuario)

print(f"Hash almacenado en BD: {hash_seguro}")
# Output: $2b$12$abcdefghijklmnopqrstuvwxyz...
```

## 2. Verificar contraseña (Login)

```python
from Codigo_Base_Primitivo import verificar_acceso

# Hash almacenado en la base de datos
hash_almacenado = "$2b$12$abcdefghijklmnopqrstuvwxyz..."

# Contraseña ingresada por el usuario
password_ingresada = "MiPassword123Seguro!"

# Verificar si es correcta
if verificar_acceso(password_ingresada, hash_almacenado):
    print("✓ Contraseña correcta - Acceso permitido")
else:
    print("✗ Contraseña incorrecta - Acceso denegado")
```

## 3. Conectar a la base de datos

```python
from Codigo_Base_Primitivo import conectar_base_datos

try:
    conexion = conectar_base_datos()
    cursor = conexion.cursor()
    
    # Ejecutar queries seguras
    cursor.execute("SELECT * FROM usuarios WHERE id = ?", (1,))
    resultado = cursor.fetchone()
    
    print("Datos obtenidos:", resultado)
    conexion.close()
    
except Exception as e:
    print(f"Error: {e}")
```

## 4. Verificar conexión a servidor

```python
from Codigo_Base_Primitivo import verificar_conexion_servidor

# IP válida
if verificar_conexion_servidor("8.8.8.8"):
    print("✓ Servidor alcanzable")
else:
    print("✗ Servidor no alcanzable")

# IP inválida (será detectada)
try:
    verificar_conexion_servidor("256.256.256.256")
except ValueError as e:
    print(f"✗ IP inválida: {e}")
```

## 5. Crear usuario de forma segura

```python
from Codigo_Base_Primitivo import conectar_base_datos, generar_hash_seguro

def crear_usuario(nombre, email, password):
    """Crea un nuevo usuario con contraseña hasheada"""
    try:
        # Validar password mínimo
        if len(password) < 8:
            raise ValueError("Contraseña debe tener al menos 8 caracteres")
        
        # Generar hash seguro
        hash_password = generar_hash_seguro(password)
        
        # Guardar en BD
        conexion = conectar_base_datos()
        cursor = conexion.cursor()
        
        # Usar parámetros preparados para evitar SQL injection
        cursor.execute(
            "INSERT INTO usuarios (nombre, email, password_hash) VALUES (?, ?, ?)",
            (nombre, email, hash_password)
        )
        
        conexion.commit()
        conexion.close()
        
        print(f"✓ Usuario {nombre} creado correctamente")
        
    except Exception as e:
        print(f"✗ Error al crear usuario: {e}")

# Usar
crear_usuario("Juan", "juan@example.com", "MiPassword123")
```

## 6. Login de usuario de forma segura

```python
from Codigo_Base_Primitivo import conectar_base_datos, verificar_acceso

def login_usuario(email, password):
    """Verifica las credenciales del usuario"""
    try:
        conexion = conectar_base_datos()
        cursor = conexion.cursor()
        
        # Buscar usuario por email
        cursor.execute("SELECT id, password_hash FROM usuarios WHERE email = ?", (email,))
        usuario = cursor.fetchone()
        
        conexion.close()
        
        if not usuario:
            print("✗ Usuario no encontrado")
            return None
        
        user_id, hash_almacenado = usuario
        
        # Verificar contraseña
        if verificar_acceso(password, hash_almacenado):
            print(f"✓ Login exitoso - Usuario ID: {user_id}")
            return user_id
        else:
            print("✗ Contraseña incorrecta")
            return None
            
    except Exception as e:
        print(f"✗ Error en login: {e}")
        return None

# Usar
usuario_id = login_usuario("juan@example.com", "MiPassword123")
```

## ⚠️ ERRORES COMUNES A EVITAR

### ❌ MALO: Hardcodear credenciales
```python
password = "admin123"
conexion = sqlite3.connect("secure_db.db")
```

### ✅ BUENO: Usar variables de entorno
```python
password = os.getenv("DB_PASSWORD")
conexion = conectar_base_datos()  # Lee de .env
```

---

### ❌ MALO: Concatenar strings en comandos
```python
os.system(f"ping {ip_servidor}")
```

### ✅ BUENO: Usar subprocess con lista de argumentos
```python
subprocess.run(["ping", "-c", "1", ip_servidor])
```

---

### ❌ MALO: Validación débil
```python
if "." in ip_servidor:
    ejecutar_ping(ip_servidor)
```

### ✅ BUENO: Validación robusta
```python
from ipaddress import ip_address
try:
    ip_address(ip_servidor)
    ejecutar_ping(ip_servidor)
except ValueError:
    print("IP inválida")
```

---

### ❌ MALO: Sin queries parametrizadas
```python
cursor.execute(f"SELECT * FROM usuarios WHERE id = {user_id}")
```

### ✅ BUENO: Con parámetros preparados
```python
cursor.execute("SELECT * FROM usuarios WHERE id = ?", (user_id,))
```

---

## 📊 Comparación: Seguridad Antes y Después

| Aspecto | ANTES | DESPUÉS |
|--------|-------|---------|
| Credenciales | Hardcodeadas | Variables de entorno |
| Hash | MD5 débil | bcrypt seguro |
| Salt | No | Automático |
| Validación | Nada | Robusta |
| Command Exec | os.system | subprocess |
| Inyecciones | Vulnerable | Protegido |

