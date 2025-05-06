import { ParsedLocationDescription } from "../models/parsed_location_description_model";

abstract class FourSquareURI {
    static placeSearchURI({
        description,
        latitude,
        longitude,
    }: {
        description : ParsedLocationDescription,
        latitude?: number,
        longitude?: number,  
    }): string {
        let uri = 'https://api.foursquare.com/v3/places/search?fields=rating,distance,description,hours,name,photos,price,website';

        const query = description.query;
        if (query !== '') uri += `&query=${query}`;
        
        const radius = description.radius;
        if (radius !== -1) uri += `&radius=${radius}`;

        // const categories = description.categories;
        // if (categories !== '') uri += `&categories=${categories}`;

        const minPrice = description.minPrice;
        if (minPrice !== 0 && minPrice >= 1 && minPrice <= 4) uri += `&min_price=${minPrice}`;

        const maxPrice = description.maxPrice;
        if (maxPrice !== 0 && maxPrice >= 1 && maxPrice <= 4) uri += `&max_price=${maxPrice}`;

        let hasOpenAt = false;
        const dow = description.dow;
        const time = description.time;
        if (dow >= 1 &&
            dow <= 7 && 
            time !== '') {
                hasOpenAt = true;
                uri += `&open_at=${dow}T${time}`;
            }

        const openNow = description.openNow;
        if (!hasOpenAt && openNow) uri += `&open_now=${openNow}`;

        const near = description.near;
        if (near !== '') uri += `&near=${near}`;

        if (latitude && longitude) {
            uri += `&ll=${latitude},${longitude}`;
        }
        console.log(uri);

        return uri;
    }
}

export {
    FourSquareURI
}