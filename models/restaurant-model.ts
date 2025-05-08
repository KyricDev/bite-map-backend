class Icon {
    prefix: string;
    suffix: string;

    constructor(data: any) {
        this.prefix = data.prefix;
        this.suffix = data.suffix;
    }
}

class Category {
    id: number;
    name: string;
    short_name: string;
    plural_name: string;
    icon: Icon;

    constructor(data: any) {
        this.id = data.id;
        this.name = data.name;
        this.short_name = data.short_name;
        this.plural_name = data.plural_name;
        this.icon = new Icon(data.icon);
    }
}

class Hours {
    is_local_holiday: boolean;
    open_now: boolean;
    display: string;
    regular: { day: number; open: string; close: string }[];

    constructor(data: any) {
        this.is_local_holiday = data.is_local_holiday;
        this.open_now = data.open_now;
        this.display = data.display;
        this.regular = data.regular || [];
    }
}


class Photo {
    id: string;
    created_at: string;
    prefix: string;
    suffix: string;
    width: number;
    height: number;
    classifications?: string[];

    constructor(data: any) {
        this.id = data.id;
        this.created_at = data.created_at;
        this.prefix = data.prefix;
        this.suffix = data.suffix;
        this.width = data.width;
        this.height = data.height;
        this.classifications = data.classifications;
    }
}

class Tip {
    created_at: string;
    text: string;

    constructor(data: any) {
        this.created_at = data.created_at;
        this.text = data.text;
    }
}

class Location {
    address: string;
    address_extended: string;
    country: string;
    cross_street: string;
    formatted_address: string;
    locality: string;
    postcode: string;
    region: string;

    constructor(data: any) {
        this.address = data.address;
        this.address_extended = data.address_extended;
        this.country = data.country;
        this.cross_street = data.cross_street;
        this.formatted_address = data.formatted_address;
        this.locality = data.locality;
        this.postcode = data.postcode;
        this.region = data.region;
    }
}


class Restaurant {
    categories: Category[];
    distance: number;
    hours: Hours;
    name: string;
    photos: Photo[];
    price: number;
    rating: number;
    tips: Tip[];
    location: Location;
    website: string;

    constructor(data: any) {
        this.categories = data.categories.map((cat: any) => new Category(cat));
        this.distance = data.distance;
        this.hours = new Hours(data.hours);
        this.name = data.name;
        this.photos = data.photos.map((photo: any) => new Photo(photo));
        this.price = data.price;
        this.rating = data.rating;
        this.tips = data.tips.map((tip: any) => new Tip(tip));
        this.location = new Location(data.location);
        this.website = data.website;
    }
}


export {
    Restaurant
}