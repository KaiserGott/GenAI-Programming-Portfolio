# ============================================================
# REFACTORIZACIÓN DE Código original
# ============================================================
# Cambios realizados:
#   - Renombré funciones y variables con términos claros y profesionales.
#   - Eliminé la redundancia: el cálculo de suma, mínimo, máximo y producto
#     se realiza con funciones reutilizables y funciones nativas de Python.
#   - Modularicé cada responsabilidad en funciones pequeñas y enfocadas.
#   - Simplifiqué la lógica condicional de los casos A/B/C/D/E usando una
#     estructura plana y cláusulas de guarda en lugar de anidamiento profundo.
#   - Mantengo la misma salida funcional, pero con mayor legibilidad y
#     mantenibilidad.
# ============================================================

import math


def calculate_sum(numbers):
    """Devuelve la suma de los números proporcionados."""
    return sum(numbers)


def calculate_product(numbers):
    """Devuelve el producto de los números proporcionados."""
    return math.prod(numbers)


def find_minimum_and_maximum(numbers):
    """Devuelve el valor mínimo y máximo de la lista."""
    return min(numbers), max(numbers)


def determine_case(average, minimum_value, maximum_value):
    """Determina el caso de salida según las reglas de negocio."""
    if average > 100 and minimum_value < 0:
        return 'caso A'
    if average > 100 and maximum_value > 1000:
        return 'caso B'
    if average > 100:
        return 'caso C'
    if minimum_value < 0:
        return 'caso D'
    return 'caso E'


def process_number_list(numbers):
    """Procesa una lista de números y muestra estadísticas relevantes."""
    if not numbers:
        print('lista vacia')
        return

    total_sum = calculate_sum(numbers)
    average_value = total_sum / len(numbers)
    minimum_value, maximum_value = find_minimum_and_maximum(numbers)
    product_value = calculate_product(numbers)

    print(f'suma: {total_sum}')
    print(f'promedio: {average_value}')
    print(f'min: {minimum_value}')
    print(f'max: {maximum_value}')
    print(f'producto: {product_value}')
    print(determine_case(average_value, minimum_value, maximum_value))


if __name__ == '__main__':
    data_sets = [
        [10, 20, 30, 40, 50],
        [5, -3, 200, 1500, 8]
    ]

    for data_set in data_sets:
        process_number_list(data_set)
