import { Router } from "express";
import { FourSquareService } from "../services/foursquare-service";
import { OpenAIService } from "../services/openai-service";
import { ParsedLocationDescription } from "../models/parsed-location-description-model";
import { ResponseModel } from "../models/response-model";
import { Logger } from "../helpers/logger";
import { Restaurant } from "../models/restaurant-model";

const executeRoutes = [
    Router().post('/execute', async (req, res) => {
        try {
            const body = req.body;

            const parseResponse = await OpenAIService.parseLocationDescription(body.query);
            const locationDescription = parseResponse.data as ParsedLocationDescription;

            Logger.print(locationDescription);

            if (!locationDescription.isDiningRelated) {
                const response = new ResponseModel();
                response.isError = true;
                response.data = {
                    'message': 'Query is not related to food, restaurants, or dining',
                }
                res.json(response)
                return;
            }

            let searchResponse = await FourSquareService.searchDiningLocations({
                description: parseResponse.data as ParsedLocationDescription,
                latitude: body.latitude,
                longitude: body.longitude,
            })


            const minRating = locationDescription.minRating;
            const maxRating = locationDescription.maxRating;

            if (minRating !== 0 || maxRating !== 10){
                const restaurants = ((searchResponse.data as any).results as Restaurant[])
                    .filter( (restaurant) => {
                        return restaurant.rating >= minRating && restaurant.rating <= maxRating;
                    });

                (searchResponse.data as any).results = restaurants;
            }

            res.json(searchResponse)
            return;
        }
        catch (error) {
            Logger.print(error);

            const response = new ResponseModel();
            response.isError = true;
            response.data = {
                'message': 'An error has occurred.'
            }
            res.json(response);
            return;
        }   
    })
];

export {
    executeRoutes
}