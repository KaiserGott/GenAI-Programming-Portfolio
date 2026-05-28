import unittest
from Proveedor import Proveedor


class TestProveedorConstructor(unittest.TestCase):
    """Pruebas unitarias para el constructor de la clase Proveedor."""
    
    def test_creacion_proveedor_exitosa(self):
        """Verifica que se crea un proveedor correctamente con datos válidos."""
        proveedor = Proveedor(
            usuario="juan_supplier",
            contrasena="segura123",
            id_fiscal="20-12345678-9",
            direccion="Calle Principal 123",
            codigo_postal="28001",
            email="juan@supplier.com",
            telefono="+34912345678"
        )
        
        self.assertEqual(proveedor.usuario, "juan_supplier")
        self.assertEqual(proveedor.contrasena, "segura123")
        self.assertEqual(proveedor.id_fiscal, "20-12345678-9")
        self.assertEqual(proveedor.direccion, "Calle Principal 123")
        self.assertEqual(proveedor.codigo_postal, "28001")
        self.assertEqual(proveedor.email, "juan@supplier.com")
        self.assertEqual(proveedor.telefono, "+34912345678")
        self.assertTrue(proveedor.activo)
    
    def test_usuario_vacio_lanza_error(self):
        """Verifica que se lanza ValueError si el usuario está vacío."""
        with self.assertRaises(ValueError) as context:
            Proveedor(
                usuario="",
                contrasena="segura123",
                id_fiscal="20-12345678-9",
                direccion="Calle Principal 123",
                codigo_postal="28001",
                email="juan@supplier.com",
                telefono="+34912345678"
            )
        self.assertIn("usuario y la contraseña no pueden estar vacíos", str(context.exception))
    
    def test_contrasena_vacia_lanza_error(self):
        """Verifica que se lanza ValueError si la contraseña está vacía."""
        with self.assertRaises(ValueError) as context:
            Proveedor(
                usuario="juan_supplier",
                contrasena="",
                id_fiscal="20-12345678-9",
                direccion="Calle Principal 123",
                codigo_postal="28001",
                email="juan@supplier.com",
                telefono="+34912345678"
            )
        self.assertIn("usuario y la contraseña no pueden estar vacíos", str(context.exception))
    
    def test_email_sin_arroba_lanza_error(self):
        """Verifica que se lanza ValueError si el email no tiene formato válido."""
        with self.assertRaises(ValueError) as context:
            Proveedor(
                usuario="juan_supplier",
                contrasena="segura123",
                id_fiscal="20-12345678-9",
                direccion="Calle Principal 123",
                codigo_postal="28001",
                email="juansupp.com",  # Sin @
                telefono="+34912345678"
            )
        self.assertIn("formato del correo electrónico no es válido", str(context.exception))
    
    def test_email_con_multiple_arroba(self):
        """Verifica que se acepta email con @ (aunque sea inválido semánticamente)."""
        proveedor = Proveedor(
            usuario="juan_supplier",
            contrasena="segura123",
            id_fiscal="20-12345678-9",
            direccion="Calle Principal 123",
            codigo_postal="28001",
            email="juan@@supplier.com",  # Múltiples @
            telefono="+34912345678"
        )
        self.assertEqual(proveedor.email, "juan@@supplier.com")
    
    def test_usuario_none_lanza_error(self):
        """Verifica que se lanza ValueError si usuario es None."""
        with self.assertRaises(ValueError):
            Proveedor(
                usuario=None,
                contrasena="segura123",
                id_fiscal="20-12345678-9",
                direccion="Calle Principal 123",
                codigo_postal="28001",
                email="juan@supplier.com",
                telefono="+34912345678"
            )
    
    def test_estado_inicial_activo(self):
        """Verifica que el proveedor se crea en estado activo."""
        proveedor = Proveedor(
            usuario="test_user",
            contrasena="pass123",
            id_fiscal="123",
            direccion="Dir 1",
            codigo_postal="123",
            email="test@mail.com",
            telefono="123"
        )
        self.assertTrue(proveedor.activo)


class TestActualizarDireccion(unittest.TestCase):
    """Pruebas unitarias para el método actualizar_direccion."""
    
    def setUp(self):
        """Crea un proveedor de prueba antes de cada test."""
        self.proveedor = Proveedor(
            usuario="carlos_prov",
            contrasena="pass456",
            id_fiscal="20-87654321-0",
            direccion="Avenida Secundaria 456",
            codigo_postal="28002",
            email="carlos@provider.com",
            telefono="+34987654321"
        )
    
    def test_actualizar_direccion_exitosa(self):
        """Verifica que se actualiza la dirección correctamente."""
        self.proveedor.actualizar_direccion("Nueva Calle 789", "28003")
        
        self.assertEqual(self.proveedor.direccion, "Nueva Calle 789")
        self.assertEqual(self.proveedor.codigo_postal, "28003")
    
    def test_actualizar_direccion_multiple_veces(self):
        """Verifica que se pueden actualizar múltiples veces."""
        self.proveedor.actualizar_direccion("Primera Dirección", "11111")
        self.assertEqual(self.proveedor.direccion, "Primera Dirección")
        
        self.proveedor.actualizar_direccion("Segunda Dirección", "22222")
        self.assertEqual(self.proveedor.direccion, "Segunda Dirección")
        self.assertEqual(self.proveedor.codigo_postal, "22222")
    
    def test_actualizar_direccion_vacia_lanza_error(self):
        """Verifica que se lanza ValueError si la dirección está vacía."""
        with self.assertRaises(ValueError) as context:
            self.proveedor.actualizar_direccion("", "28004")
        self.assertIn("dirección y el código postal no pueden estar vacíos", str(context.exception))
    
    def test_actualizar_cp_vacio_lanza_error(self):
        """Verifica que se lanza ValueError si el código postal está vacío."""
        with self.assertRaises(ValueError) as context:
            self.proveedor.actualizar_direccion("Nueva Calle", "")
        self.assertIn("dirección y el código postal no pueden estar vacíos", str(context.exception))
    
    def test_actualizar_direccion_y_cp_vacios_lanza_error(self):
        """Verifica que se lanza ValueError si ambos parámetros están vacíos."""
        with self.assertRaises(ValueError):
            self.proveedor.actualizar_direccion("", "")
    
    def test_actualizar_direccion_none_lanza_error(self):
        """Verifica que se lanza ValueError si la dirección es None."""
        with self.assertRaises(ValueError):
            self.proveedor.actualizar_direccion(None, "28005")
    
    def test_actualizar_cp_none_lanza_error(self):
        """Verifica que se lanza ValueError si el CP es None."""
        with self.assertRaises(ValueError):
            self.proveedor.actualizar_direccion("Nueva Calle", None)
    
    def test_actualizar_direccion_con_caracteres_especiales(self):
        """Verifica que se aceptan direcciones con caracteres especiales."""
        self.proveedor.actualizar_direccion("Calle Ñoño # 123, Apt. 4B", "28006")
        self.assertEqual(self.proveedor.direccion, "Calle Ñoño # 123, Apt. 4B")


class TestCambiarEstado(unittest.TestCase):
    """Pruebas unitarias para el método cambiar_estado."""
    
    def setUp(self):
        """Crea un proveedor de prueba antes de cada test."""
        self.proveedor = Proveedor(
            usuario="laura_biz",
            contrasena="segura789",
            id_fiscal="20-11111111-1",
            direccion="Playa 999",
            codigo_postal="28007",
            email="laura@business.com",
            telefono="+34911111111"
        )
    
    def test_cambiar_estado_a_inactivo(self):
        """Verifica que se puede desactivar un proveedor."""
        self.assertTrue(self.proveedor.activo)
        self.proveedor.cambiar_estado(False)
        self.assertFalse(self.proveedor.activo)
    
    def test_cambiar_estado_a_activo(self):
        """Verifica que se puede reactivar un proveedor."""
        self.proveedor.cambiar_estado(False)
        self.assertFalse(self.proveedor.activo)
        
        self.proveedor.cambiar_estado(True)
        self.assertTrue(self.proveedor.activo)
    
    def test_cambiar_estado_multiples_veces(self):
        """Verifica que se puede cambiar el estado múltiples veces."""
        self.proveedor.cambiar_estado(False)
        self.assertFalse(self.proveedor.activo)
        
        self.proveedor.cambiar_estado(True)
        self.assertTrue(self.proveedor.activo)
        
        self.proveedor.cambiar_estado(False)
        self.assertFalse(self.proveedor.activo)
    
    def test_cambiar_estado_con_valor_truthy(self):
        """Verifica que valores truthy se convierten a True."""
        self.proveedor.cambiar_estado(1)
        self.assertEqual(self.proveedor.activo, 1)
    
    def test_cambiar_estado_con_valor_falsy(self):
        """Verifica que valores falsy se convierten a False."""
        self.proveedor.cambiar_estado(0)
        self.assertEqual(self.proveedor.activo, 0)


class TestGetPerfilPublico(unittest.TestCase):
    """Pruebas unitarias para el método get_perfil_publico."""
    
    def setUp(self):
        """Crea un proveedor de prueba antes de cada test."""
        self.proveedor = Proveedor(
            usuario="diego_trade",
            contrasena="super_secret_pass",
            id_fiscal="20-22222222-2",
            direccion="Mercado Central 500",
            codigo_postal="28008",
            email="diego@trading.com",
            telefono="+34922222222"
        )
    
    def test_perfil_publico_contiene_campos_requeridos(self):
        """Verifica que el perfil público contiene los campos esperados."""
        perfil = self.proveedor.get_perfil_publico()
        
        self.assertIn("identificador_fiscal", perfil)
        self.assertIn("direccion_completa", perfil)
        self.assertIn("contacto", perfil)
        self.assertIn("estado_activo", perfil)
    
    def test_perfil_publico_no_expone_contrasena(self):
        """Verifica que la contraseña NO aparece en el perfil público."""
        perfil = self.proveedor.get_perfil_publico()
        
        self.assertNotIn("contrasena", perfil)
        self.assertNotIn("super_secret_pass", str(perfil))
    
    def test_perfil_publico_no_expone_usuario(self):
        """Verifica que el usuario NO aparece en el perfil público."""
        perfil = self.proveedor.get_perfil_publico()
        
        self.assertNotIn("usuario", perfil)
        self.assertNotIn("diego_trade", str(perfil))
    
    def test_perfil_publico_contiene_datos_correctos(self):
        """Verifica que los datos del perfil público son correctos."""
        perfil = self.proveedor.get_perfil_publico()
        
        self.assertEqual(perfil["identificador_fiscal"], "20-22222222-2")
        self.assertEqual(perfil["contacto"], "diego@trading.com")
        self.assertTrue(perfil["estado_activo"])
    
    def test_perfil_publico_incluye_codigo_postal_en_direccion(self):
        """Verifica que el código postal aparece en la dirección completa."""
        perfil = self.proveedor.get_perfil_publico()
        
        self.assertIn("Mercado Central 500", perfil["direccion_completa"])
        self.assertIn("28008", perfil["direccion_completa"])
        self.assertIn("CP:", perfil["direccion_completa"])
    
    def test_perfil_publico_cuando_inactivo(self):
        """Verifica que el perfil refleja correctamente cuando proveedor está inactivo."""
        self.proveedor.cambiar_estado(False)
        perfil = self.proveedor.get_perfil_publico()
        
        self.assertFalse(perfil["estado_activo"])
    
    def test_perfil_publico_es_diccionario(self):
        """Verifica que el método devuelve un diccionario."""
        perfil = self.proveedor.get_perfil_publico()
        
        self.assertIsInstance(perfil, dict)
    
    def test_perfil_publico_despues_actualizar_direccion(self):
        """Verifica que el perfil se actualiza cuando cambia la dirección."""
        self.proveedor.actualizar_direccion("Nueva Locación 100", "28099")
        perfil = self.proveedor.get_perfil_publico()
        
        self.assertIn("Nueva Locación 100", perfil["direccion_completa"])
        self.assertIn("28099", perfil["direccion_completa"])


class TestIntegracion(unittest.TestCase):
    """Pruebas de integración que verifican interacciones entre métodos."""
    
    def test_ciclo_completo_proveedor(self):
        """Verifica un ciclo completo: crear, actualizar, cambiar estado, ver perfil."""
        # Crear proveedor
        proveedor = Proveedor(
            usuario="miguel_corp",
            contrasena="corp123456",
            id_fiscal="20-33333333-3",
            direccion="Oficina 1",
            codigo_postal="28009",
            email="miguel@corp.com",
            telefono="+34933333333"
        )
        
        # Verificar estado inicial
        self.assertTrue(proveedor.activo)
        perfil1 = proveedor.get_perfil_publico()
        self.assertIn("Oficina 1", perfil1["direccion_completa"])
        
        # Actualizar dirección
        proveedor.actualizar_direccion("Oficina 2", "28010")
        perfil2 = proveedor.get_perfil_publico()
        self.assertIn("Oficina 2", perfil2["direccion_completa"])
        
        # Desactivar proveedor
        proveedor.cambiar_estado(False)
        perfil3 = proveedor.get_perfil_publico()
        self.assertFalse(perfil3["estado_activo"])
    
    def test_multiples_proveedores_independientes(self):
        """Verifica que múltiples proveedores son independientes."""
        prov1 = Proveedor(
            usuario="user1",
            contrasena="pass1",
            id_fiscal="id1",
            direccion="dir1",
            codigo_postal="cp1",
            email="user1@mail.com",
            telefono="111"
        )
        
        prov2 = Proveedor(
            usuario="user2",
            contrasena="pass2",
            id_fiscal="id2",
            direccion="dir2",
            codigo_postal="cp2",
            email="user2@mail.com",
            telefono="222"
        )
        
        # Modificar prov1
        prov1.cambiar_estado(False)
        prov1.actualizar_direccion("nueva_dir1", "nuevo_cp1")
        
        # Verificar que prov2 no se vio afectado
        self.assertTrue(prov2.activo)
        self.assertEqual(prov2.direccion, "dir2")
        self.assertEqual(prov2.codigo_postal, "cp2")


class TestCasosEdge(unittest.TestCase):
    """Pruebas de casos límite y situaciones extraordinarias."""
    
    def test_email_con_solo_arroba(self):
        """Verifica que se acepta un email que solo tiene @."""
        proveedor = Proveedor(
            usuario="user",
            contrasena="pass",
            id_fiscal="id",
            direccion="dir",
            codigo_postal="cp",
            email="@",
            telefono="tel"
        )
        self.assertEqual(proveedor.email, "@")
    
    def test_campos_numericos_como_strings(self):
        """Verifica que los campos aceptan valores numéricos convertidos a strings."""
        proveedor = Proveedor(
            usuario="user123",
            contrasena="pass456",
            id_fiscal=12345678,  # Número, no string
            direccion="Calle 123",
            codigo_postal=28001,  # Número
            email="test@mail.com",
            telefono=123456789  # Número
        )
        self.assertEqual(proveedor.id_fiscal, 12345678)
        self.assertEqual(proveedor.codigo_postal, 28001)
    
    def test_direccion_muy_larga(self):
        """Verifica que se acepta una dirección muy larga."""
        direccion_larga = "C" * 500
        proveedor = Proveedor(
            usuario="user",
            contrasena="pass",
            id_fiscal="id",
            direccion=direccion_larga,
            codigo_postal="cp",
            email="test@mail.com",
            telefono="tel"
        )
        self.assertEqual(proveedor.direccion, direccion_larga)
    
    def test_email_con_espacios(self):
        """Verifica que se acepta email con espacios (aunque sea inválido)."""
        proveedor = Proveedor(
            usuario="user",
            contrasena="pass",
            id_fiscal="id",
            direccion="dir",
            codigo_postal="cp",
            email="test @mail.com",  # Con espacio
            telefono="tel"
        )
        self.assertEqual(proveedor.email, "test @mail.com")


if __name__ == '__main__':
    unittest.main()
