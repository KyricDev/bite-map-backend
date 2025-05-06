import { Router } from "express";
import { searchRoutes } from "./foursquare_routes";


const apiRoutes = Router().use('/api', searchRoutes)

export {
    apiRoutes
}