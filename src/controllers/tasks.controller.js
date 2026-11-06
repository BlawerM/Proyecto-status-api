import * as service from '../services/tasks.service.js'

export function crear(req, res, next) {
    const body = req.body || {}
    const { desc, categoria } = body

    if (!desc || !categoria) {
        return res.status(400).json({ error: 'desc y categoria son obligatorios' })
    }

    const nuevo = service.crear(body)
    res.status(201).json(nuevo)
}

export function listar(req, res, next){
    const datos = service.listar(req.query)
    res.json({ total: datos.length, datos})
}

export function obtener(req, res, next) {
    const item = service.buscarPorId(Number(req.params.id))
    if(!item) return res.status(404).json({error: 'Producto no encontrado'});
    res.json(item);
}

export function eliminar(req, res, next) {
    const item = service.eliminar(Number(req.params.id))
    if(!item) return res.status(404).json({error: 'Producto no encontrado'})
    res.json({ 
        message: 'Producto eliminado correctamente', 
        itemEliminado: item 
    })
}