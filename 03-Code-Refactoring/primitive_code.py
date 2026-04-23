# ============================================================
# CÓDIGO PRIMITIVO - Sin refactorizar
# ============================================================
# Problemas:
#   - Nombres de variables y funciones poco descriptivos
#   - Código repetido
#   - Lógica condicional compleja y difícil de leer
#   - Funciones largas y poco modulares
# ============================================================

def calc(lst):
    t = 0
    for x in lst:
        t = t + x
    return t

def pr(lst):
    r = 1
    for x in lst:
        r = r * x
    return r

def f(lst):
    mn = lst[0]
    mx = lst[0]
    for x in lst:
        if x < mn:
            mn = x
        if x > mx:
            mx = x
    return mn, mx

def process(lst):
    if len(lst) == 0:
        print("lista vacia")
        return
    
    t = 0
    for x in lst:
        t = t + x
    avg = t / len(lst)

    mn = lst[0]
    mx = lst[0]
    for x in lst:
        if x < mn:
            mn = x
        if x > mx:
            mx = x

    r = 1
    for x in lst:
        r = r * x

    print("suma: " + str(t))
    print("promedio: " + str(avg))
    print("min: " + str(mn))
    print("max: " + str(mx))
    print("producto: " + str(r))

    if avg > 100:
        if mn < 0:
            print("caso A")
        else:
            if mx > 1000:
                print("caso B")
            else:
                print("caso C")
    else:
        if mn < 0:
            print("caso D")
        else:
            print("caso E")


data1 = [10, 20, 30, 40, 50]
data2 = [5, -3, 200, 1500, 8]

process(data1)
process(data2)
