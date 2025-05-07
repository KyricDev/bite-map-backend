import { Router } from "express";
import { FourSquareService } from "../services/foursquare_service";
import { OpenAIService } from "../services/openai_service";
import { ParsedLocationDescription } from "../models/parsed_location_description_model";
import { ResponseModel } from "../models/response_model";

const executeRoutes = [
    Router().post('/execute', async (req, res) => {
        const body = req.body;

        const parseResponse = await OpenAIService.parseLocationDescription(req, res);
        const locationDescription = parseResponse.data as ParsedLocationDescription;

        if (!locationDescription.isDiningRelated) {
            const response = new ResponseModel();
            response.isError = true;
            response.data = {
                'message': 'Query is not related to dining',
            }
            res.json(response)
            return;
        }

        const searchResponse = await FourSquareService.searchDiningLocations({
            description: parseResponse.data as ParsedLocationDescription,
            latitude: body.latitude,
            longitude: body.longitude,
        })

        res.json(searchResponse)
    })
];

export {
    executeRoutes
}