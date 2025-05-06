import { FourSquareURI } from "../constants/uri_constants";
import { ParsedLocationDescription } from "../models/parsed_location_description_model";
import { ResponseModel } from "../models/response_model";

abstract class FourSquareService {
    static async searchDiningLocations({
        description, 
        latitude, 
        longitude
    } : {
        description : ParsedLocationDescription, 
        latitude? : number, 
        longitude?: number,
    }) : Promise<ResponseModel> {
        const response = await fetch(FourSquareURI.placeSearchURI({
            description: description,
            latitude: latitude,
            longitude: longitude,
        }),{
            method: 'GET',
            headers: new Headers({
                'Authorization': `${process.env.FOURSQUARE_API_KEY}`,
                'accept': 'application/json',
            }) 
        } )


        const responseModel = new ResponseModel();
        responseModel.data = await response.json();
        responseModel.isError = false;
        return responseModel;
    }
}

export {
    FourSquareService
}