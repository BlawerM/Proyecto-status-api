let productos = [
    {id: 1, desc: "BMW", categoria: "carros"},
    {id: 2, desc: "Suzuki", categoria: "carros"},
    {id: 3, desc: "Escarabajo", categoria: "carros"},
    {id: 4, desc: "HP", categoria: "computadores"},
    {id: 5, desc: "MAC", categoria: "computadores"},
    {id: 6, desc: "Lenovo", categoria: "computadores"},
    {id: 7, desc: "Dell", categoria: "computadores"},
]
let siguienteId = 8

export function listar({categoria, precioMax} = {}) {
    let datos = productos
    if (categoria) datos = datos.filter(p => p.categoria === categoria)
    if (precioMax) datos = datos.filter (p => p.precio <= Number(precioMax))
    return datos
}

export function buscarPorId(id) {
    return productos.find(p => p.id === id)
}

export function crear(datos) {
    const nuevo = {id: siguienteId++, ...datos}
    productos.push(nuevo)
    return nuevo
}

export function eliminar(id) {
    const index = productos.find(p => p.id === id)
    if (index === -1) return null
    
    const [eliminado] = productos.splice(index, 1)
    return eliminado
}