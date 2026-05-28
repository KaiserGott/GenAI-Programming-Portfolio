# Pruebas Unitarias - Clase Proveedor

## Resumen Ejecutivo

Se han desarrollado **34 pruebas unitarias completas** que cubren todos los métodos de la clase `Proveedor` con múltiples escenarios, incluyendo casos exitosos, validaciones, casos límite e integraciones.

**Resultado: ✅ TODAS LAS PRUEBAS PASAN**

---

## Estructura de las Pruebas

Las pruebas están organizadas en **6 clases de prueba**:

### 1. **TestProveedorConstructor** (7 pruebas)
Verifica la creación correcta del proveedor y todas las validaciones del constructor.

| Prueba | Descripción | Propósito |
|--------|-------------|----------|
| `test_creacion_proveedor_exitosa` | Crea un proveedor con datos válidos | Caso exitoso principal |
| `test_usuario_vacio_lanza_error` | Valida error cuando usuario está vacío | Validación de campo requerido |
| `test_contrasena_vacia_lanza_error` | Valida error cuando contraseña está vacía | Validación de campo requerido |
| `test_email_sin_arroba_lanza_error` | Valida error cuando email no tiene @ | Validación de formato |
| `test_email_con_multiple_arroba` | Acepta email con múltiples @ | Límite: validación débil |
| `test_usuario_none_lanza_error` | Valida error cuando usuario es None | Caso edge: valor None |
| `test_estado_inicial_activo` | Verifica que activo inicia como True | Estado inicial correcto |

---

### 2. **TestActualizarDireccion** (8 pruebas)
Prueba el método `actualizar_direccion()` con validaciones completas.

| Prueba | Descripción | Propósito |
|--------|-------------|----------|
| `test_actualizar_direccion_exitosa` | Actualiza dirección y CP correctamente | Caso exitoso |
| `test_actualizar_direccion_multiple_veces` | Actualiza dos veces consecutivas | Cambios repetidos |
| `test_actualizar_direccion_vacia_lanza_error` | Error cuando dirección está vacía | Validación de campo |
| `test_actualizar_cp_vacio_lanza_error` | Error cuando CP está vacío | Validación de campo |
| `test_actualizar_direccion_y_cp_vacios_lanza_error` | Error cuando ambos están vacíos | Validación conjunta |
| `test_actualizar_direccion_none_lanza_error` | Error cuando dirección es None | Caso edge: None |
| `test_actualizar_cp_none_lanza_error` | Error cuando CP es None | Caso edge: None |
| `test_actualizar_direccion_con_caracteres_especiales` | Acepta caracteres especiales (ñ, #, etc) | Caracteres internacionales |

---

### 3. **TestCambiarEstado** (5 pruebas)
Verifica el método `cambiar_estado()` para activar/desactivar proveedores.

| Prueba | Descripción | Propósito |
|--------|-------------|----------|
| `test_cambiar_estado_a_inactivo` | Cambia de activo a inactivo | Caso exitoso |
| `test_cambiar_estado_a_activo` | Cambia de inactivo a activo | Reactivación |
| `test_cambiar_estado_multiples_veces` | Alterna el estado 3 veces | Cambios repetidos |
| `test_cambiar_estado_con_valor_truthy` | Acepta valores truthy (1) | Flexibilidad de entrada |
| `test_cambiar_estado_con_valor_falsy` | Acepta valores falsy (0) | Flexibilidad de entrada |

---

### 4. **TestGetPerfilPublico** (8 pruebas)
Verifica que el perfil público devuelve datos correctos sin exponer información sensible.

| Prueba | Descripción | Propósito |
|--------|-------------|----------|
| `test_perfil_publico_contiene_campos_requeridos` | Tiene los 4 campos esperados | Estructura correcta |
| `test_perfil_publico_no_expone_contrasena` | NO incluye contraseña | Seguridad |
| `test_perfil_publico_no_expone_usuario` | NO incluye usuario | Seguridad |
| `test_perfil_publico_contiene_datos_correctos` | Valores correctos en cada campo | Precisión de datos |
| `test_perfil_publico_incluye_codigo_postal_en_direccion` | CP está en dirección_completa | Formato esperado |
| `test_perfil_publico_cuando_inactivo` | Estado_activo = False cuando inactivo | Refleja estado correcto |
| `test_perfil_publico_es_diccionario` | Devuelve dict (no string u otro tipo) | Tipo correcto |
| `test_perfil_publico_despues_actualizar_direccion` | Refleja cambios en dirección | Sincronización de datos |

---

### 5. **TestIntegracion** (2 pruebas)
Verifica interacciones entre múltiples métodos.

| Prueba | Descripción | Propósito |
|--------|-------------|----------|
| `test_ciclo_completo_proveedor` | Crea → Actualiza → Desactiva → Consulta perfil | Flujo completo |
| `test_multiples_proveedores_independientes` | Dos proveedores no interfieren entre sí | Independencia |

---

### 6. **TestCasosEdge** (4 pruebas)
Pruebas de límites y situaciones extraordinarias.

| Prueba | Descripción | Propósito |
|--------|-------------|----------|
| `test_email_con_solo_arroba` | Email "@" es aceptado | Límite: validación mínima |
| `test_campos_numericos_como_strings` | Acepta números en campos string | Flexibilidad de tipos |
| `test_direccion_muy_larga` | Acepta direcciones de 500+ caracteres | Límite de tamaño |
| `test_email_con_espacios` | Acepta email "test @mail.com" | Caracteres especiales |

---

## Cobertura de Funcionalidad

### ✅ Constructor (`__init__`)
- [x] Creación exitosa con datos válidos
- [x] Validación de usuario no vacío
- [x] Validación de contraseña no vacía
- [x] Validación de email con @
- [x] Inicialización correcta de atributos
- [x] Estado inicial `activo = True`
- [x] Casos edge (None, valores numéricos, etc.)

### ✅ Método `actualizar_direccion()`
- [x] Actualización exitosa
- [x] Validación de dirección no vacía
- [x] Validación de CP no vacío
- [x] Actualizaciones múltiples
- [x] Casos edge (None, caracteres especiales, etc.)

### ✅ Método `cambiar_estado()`
- [x] Cambio a inactivo
- [x] Cambio a activo
- [x] Cambios múltiples
- [x] Valores truthy/falsy

### ✅ Método `get_perfil_publico()`
- [x] Estructura completa del diccionario
- [x] Datos correctos en cada campo
- [x] No expone información sensible (contraseña, usuario)
- [x] Sincronización con cambios de estado
- [x] Sincronización con cambios de dirección

---

## Ejecución de las Pruebas

### Comando para ejecutar todas las pruebas:
```bash
python -m unittest test_proveedor -v
```

### Comando para ejecutar una clase específica:
```bash
python -m unittest test_proveedor.TestProveedorConstructor -v
```

### Comando para ejecutar una prueba específica:
```bash
python -m unittest test_proveedor.TestProveedorConstructor.test_creacion_proveedor_exitosa -v
```

---

## Resultados Finales

```
Ran 34 tests in 0.007s
OK
```

### Desglose por Clase:
- **TestProveedorConstructor**: 7/7 ✅
- **TestActualizarDireccion**: 8/8 ✅
- **TestCambiarEstado**: 5/5 ✅
- **TestGetPerfilPublico**: 8/8 ✅
- **TestIntegracion**: 2/2 ✅
- **TestCasosEdge**: 4/4 ✅

---

## Técnicas de Prueba Utilizadas

1. **Pruebas Positivas**: Verifican comportamiento correcto con datos válidos
2. **Pruebas Negativas**: Verifican que se lanzan excepciones apropiadas
3. **Pruebas de Validación**: Verifican reglas de negocio y formato
4. **Pruebas de Seguridad**: Verifican que no se expone información sensible
5. **Pruebas de Integración**: Verifican interacciones entre métodos
6. **Pruebas de Casos Límite**: Verifican comportamiento en situaciones extraordinarias
7. **Pruebas de Independencia**: Verifican que múltiples instancias no interfieren

---

## Configuración de setUp()

Varias clases de prueba utilizan `setUp()` para crear instancias base:

```python
def setUp(self):
    """Crea un proveedor de prueba antes de cada test."""
    self.proveedor = Proveedor(
        usuario="...",
        contrasena="...",
        id_fiscal="...",
        direccion="...",
        codigo_postal="...",
        email="...",
        telefono="..."
    )
```

Esto garantiza que cada prueba comience con un estado limpio.

---

## Recomendaciones Futuras

1. **Agregar validaciones más estrictas** en el email (verificar formato más riguroso)
2. **Validar formato de teléfono** (ej: longitud mínima)
3. **Validar formato de código postal** (según región)
4. **Agregar métodos de auditoría** (fecha de creación, última modificación)
5. **Encriptar contraseña** (no almacenarla en texto plano)
6. **Agregar pruebas de rendimiento** para operaciones masivas

---

Documento generado: Conjunto completo de pruebas unitarias para la clase Proveedor
