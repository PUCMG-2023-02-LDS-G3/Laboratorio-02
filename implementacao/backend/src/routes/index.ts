import  express  from 'express';
import clientRoutes from './client.ts'
import agenteRoutes from './agente.ts'

const routes = express()

routes.use('/usuario', clientRoutes)
routes.use('/agente', agenteRoutes)

export {routes}