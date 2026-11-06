// middleware propio: mide cuanto tarda entre recibir y responder
export function logger(req, res, next) {
  const inicio = Date.now()
 
  res.on('finish', () => {
    const ms = Date.now() - inicio
    console.log(`${req.method} ${req.url} -> ${res.statusCode} (${ms}ms)`)
  })
 
  next()   // sin esto, la peticion se queda colgada
}
