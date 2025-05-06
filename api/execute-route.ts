import { Router } from "express";
import { FourSquareService } from "../services/foursquare_service";
import { OpenAIService } from "../services/openai_service";
import { ParsedLocationDescription } from "../models/parsed_location_description_model";

const executeRoutes = [
    Router().post('/execute', async (req, res) => {
        const body = req.body;

        const parseResponse = await OpenAIService.parseLocationDescription(req, res);
        const searchResponse = await FourSquareService.searchDiningLocations({
            description: parseResponse.data as ParsedLocationDescription,
            latitude: body.latitude,
            longitude: body.longitude,
        })

        res.json(searchResponse.data)
    })
];

export {
    executeRoutes
}