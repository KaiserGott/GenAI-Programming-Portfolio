from mcp.server.fastmcp import FastMCP

mcp = FastMCP("Servidor Sumador")

@mcp.tool()
def sumar(a: int | float, b: int | float) -> int | float:
    """
    Suma dos números y devuelve el resultado.
    Args:
        a (int | float): El primer número a sumar.
        b (int | float): El segundo número a sumar.
    Returns:
        int | float: La suma de a y b.
    """   
    return a + b

mcp.run()

