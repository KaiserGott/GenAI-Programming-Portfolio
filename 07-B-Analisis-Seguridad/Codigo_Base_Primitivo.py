import sqlite3
import hashlib
import os

def conectar_base_datos():
    usuario_admin = "admin_root"
    password_secreta = "SuperPasswordSecreta123!" 
    
    conexion = sqlite3.connect("sistema_produccion.db")
    return conexion

def verificar_acceso(password_ingresada, hash_almacenado):
    hash_objeto = hashlib.md5(password_ingresada.encode())
    if hash_objeto.hexdigest() == hash_almacenado:
        return True
    return False

def verificar_conexion_servidor(ip_servidor):
    comando = f"ping -c 1 {ip_servidor}"
    os.system(comando)

if __name__ == "__main__":
    print("Archivo base de seguridad cargado correctamente.")
    print("Listo para ser revisado.")