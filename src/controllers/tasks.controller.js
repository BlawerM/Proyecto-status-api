import * as service from '../services/tasks.service.js'

export async function crear(req, res, next) {
    try {
        const body = req.body || {}
        const { title, desc, incentive, status } = body

        if (!title || !desc || incentive === undefined || !status) {
            return res.status(400).json({ error: 'title, desc, incentive y status son obligatorios' })
        }

        if (typeof incentive !== 'number' || incentive < 1) {
            return res.status(400).json({ error: 'incentive debe ser numérico y mayor o igual a 1' })
        }

        const nuevo = await service.crear({ title, desc, incentive, status })
        res.status(201).json(nuevo)
    } catch (error) {
        if (error.code === 121) {
            return res.status(400).json({ error: 'El valor de status no está permitido en la base de datos' })
        }
        next(error)
    }
}

export async function listar(req, res, next){
    try {
        const datos = await service.listar(req.query)
        res.json({ total: datos.length, datos})
    } catch (error) {
        next(error)
    }
}

export async function obtener(req, res, next) {
    try {
        const item = await service.buscarPorId(req.params.id)
        if (!item) return res.status(404).json({error: 'Tarea no encontrada'})
        res.json(item)
    }catch(error){
        next(error)
    }
}

export async function actualizar(req, res, next) {
    try {
        const body = req.body || {}
        const {title, desc, incentive, status} = body
        const datosActualizar = {}

        if (title !== undefined) datosActualizar.title = title;
        if (desc !== undefined) datosActualizar.desc = desc;
        if (incentive !== undefined) {
            if (typeof incentive !== 'number' || incentive < 1){
                return res.status(400).json({ error: 'El incentivo debe ser numérico y mayor a 0'})
            }
            datosActualizar.incentive = incentive;
        }
        if (status!== undefined) datosActualizar.status = status;
        if (Object.keys(datosActualizar).length === 0) {
            return res.status(400).json({error: 'Debe enviar al menos un campo válido'})
        }

        const itemActualizado = await service.actualizar(req.params.id, datosActualizar);
        if(!itemActualizado) return res.status(404).json({ error: 'Tarea no encontrada'});

        res.json(itemActualizado)
    } catch (error) {
        if (error.code === 121) {
            return res.status(400).json({error: 'El valor de status no está permitido'})
        }
        next(error);
    }
}

export async function eliminar(req, res, next) {
    try {
        const item = await service.eliminar(req.params.id)
        if (!item) return res.status(404).json({error: 'Tarea no encontrada'})
            res.json({
        message: 'Tarea eliminada correctamente',
        itemEliminado: item})
    }catch(error){
        next(error)
    }
}