import { Router } from "express";
import { searchRoutes } from "./search_place";


const apiRoutes = Router().use('/api', searchRoutes)

export {
    apiRoutes
}