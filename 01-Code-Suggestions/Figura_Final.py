# A1 - Sugerencia de finalizacion de código
# 1 - Escribir una funcion que calcula el áera de un rectángulo.
# 2 - Imprimir el resultado de la funcion con 2 valores de base y altura.
# 3 - Escribir una función que calcula el área de un círculo.
# 4 - Imprimir el resultado de la función con un valor de radio.

def calcular_area_rectangulo(base, altura):
    return base * altura

base = 5
altura = 3
area_rectangulo = calcular_area_rectangulo(base, altura)
print(f"El área del rectángulo es: {area_rectangulo}")


import math
def calcular_area_circulo(radio):
    return math.pi * radio ** 2

radio = 4
area_circulo = calcular_area_circulo(radio)
print(f"El área del círculo es: {area_circulo}")

