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
        const fields = [
            'rating',
            'distance',
            'description',
            'hours',
            'name',
            'photos',
            'price',
            'website',
            'categories',
            'tips',
            'location',
            'fsq_id'
        ];
        let uri = `https://api.foursquare.com/v3/places/search?fields=${fields.join(',')}&categories=13000`;

        const query = description.query;
        if (query !== '') uri += `&query=${query}`;

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
        let hasNear = false;
        if (near !== '') {
            hasNear = true;
            uri += `&near=${near}`;
        }

        let hasCoordinates = false;
        if (latitude && 
            longitude && 
            !hasNear) {
            hasCoordinates = true;
            uri += `&ll=${latitude},${longitude}`;
        }
        
        const radius = description.radius;
        if (radius !== -1 && !hasNear) {
                uri += `&radius=${radius}`;
        }


        console.log(uri);

        return uri;
    }
}

export {
    FourSquareURI
}