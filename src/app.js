import express from 'express'
import tasksRouter from './routes/tasks.routes.js'
import { logger } from './middlewares/logger.js'
 
const app = express();

app.use(express.json());
app.use(logger)

//rutas, creo
app.get('/', (req, res) => res.json({ ok: true}))
app.use('/tasks', tasksRouter)

//no coincide ninguna ruta
app.use((req, res) => {
    res.status(404).json({error: 'Ruta no encontrada'})
})

//Errores no controlados
app.use((err, req, res, next) => {
    console.error(err)
    res.status(500).json({ error: 'error de servidor'})
})

export default app