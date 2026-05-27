def calcular_promedio(valores):
    # Pero si tiene datos, divide por la cantidad de notas.
    if not valores:
        return 0
    
    suma_total = sum(valores)
    promedio = suma_total / 5  
    return promedio

# Prueba con 3 notas: [10, 10, 10]. El promedio debería ser 10.
notas = [10, 10, 10]
resultado = calcular_promedio(notas)

print(f"Resultado obtenido: {resultado}") 
# Imprime el resultado