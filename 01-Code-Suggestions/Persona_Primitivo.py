# A1 - Sugerencia de proxima edicion de código
""" Clase persona con atributos nombre, edad y genero, y un método que imprime 
una presentación de la persona """

class Persona:
    def __init__(self, nombre, edad, genero):
        self.nombre = nombre
        self.edad = edad
        self.genero = genero

    def presentacion(self):
        return f"Hola, mi nombre es {self.nombre}, tengo {self.edad} años y soy {self.genero}."
    
Persona1 = Persona("Juan", 30, "masculino")
print(Persona1.presentacion())   

# agregar un método a la clase persona permita validar si la persona es mayor de edad o no.
