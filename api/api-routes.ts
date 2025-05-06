import { Router } from "express";
import { executeRoutes } from "./execute-route";


const apiRoutes = Router().use('/api', executeRoutes)

export {
    apiRoutes
}