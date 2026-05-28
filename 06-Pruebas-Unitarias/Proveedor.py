class Proveedor:
    def __init__(self, usuario, contrasena, id_fiscal, direccion, codigo_postal, email, telefono):
        # Validaciones iniciales (útiles para las pruebas unitarias)
        if not usuario or not contrasena:
            raise ValueError("El usuario y la contraseña no pueden estar vacíos")
        if "@" not in email:
            raise ValueError("El formato del correo electrónico no es válido")
        
        self.usuario = usuario
        self.contrasena = contrasena
        self.id_fiscal = id_fiscal  # Ej: CUIT, RUT, NIT, CIF
        self.direccion = direccion
        self.codigo_postal = codigo_postal
        self.email = email
        self.telefono = telefono
        self.activo = True  # Campo extra: permite dar de baja un proveedor sin borrarlo

    def actualizar_direccion(self, nueva_direccion, nuevo_cp):
        """Permite actualizar el domicilio del proveedor."""
        if not nueva_direccion or not nuevo_cp:
            raise ValueError("La dirección y el código postal no pueden estar vacíos")
        self.direccion = nueva_direccion
        self.codigo_postal = nuevo_cp

    def cambiar_estado(self, estado):
        """Activa o desactiva al proveedor para operar en el sistema."""
        self.activo = estado

    def get_perfil_publico(self):
        """Devuelve los datos del proveedor que pueden ver los clientes (sin contraseña)."""
        return {
            "identificador_fiscal": self.id_fiscal,
            "direccion_completa": f"{self.direccion} (CP: {self.codigo_postal})",
            "contacto": self.email,
            "estado_activo": self.activo
        }