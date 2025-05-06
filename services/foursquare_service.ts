import { FourSquareURI } from "../constants/uri_constants";
import { ParsedLocationDescription } from "./openai_service";

abstract class FourSquareService {
    static async searchDiningLocations({
        description, 
        latitude, 
        longitude
    } : {
        description : ParsedLocationDescription, 
        latitude? : number, 
        longitude?: number,
    }) {
        const response = await fetch(FourSquareURI.placeSearchURI({
            description: description,
        }),{
            method: 'GET',
            headers: new Headers({
                'Authorization': `${process.env.FOURSQUARE_API_KEY}`,
                'accept': 'application/json',
            }) 
        } )

        return await response.json();
    }
}

export {
    FourSquareService
}