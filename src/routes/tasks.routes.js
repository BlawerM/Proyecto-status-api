import { Router } from "express";
import * as ctrl from '../controllers/tasks.controller.js'

const router = Router();

router.get('/', ctrl.listar) //get tareas
router.get('/:id', ctrl.obtener) //get tareas/id
router.post('/', ctrl.crear) //post tareas
//router.put('/:id', ctrl.actualizar) //put tareas/id
//router.patch('/:id', ctrl.parcial) //patch taras/id
router.delete('/:id', ctrl.eliminar) //delete tareas/id

export default router