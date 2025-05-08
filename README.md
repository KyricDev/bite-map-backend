# BITE MAP

Bite map is a restaurant finding application that can infer from natural human language.

It is powered by [OpenAI's GPT model](https://platform.openai.com/docs/api-reference/introduction) for natural language conversion and [Foursquare Place API](https://docs.foursquare.com/developer/reference/place-search) for location query and data.

This is the backend code for the application. You can find the frontend code [here](https://github.com/KyricDev/bite-map-frontend).

You can try the live application [here](https://bite-map.vercel.app/).

## Running Locally

1. Clone the repository.
```
  git clone https://github.com/KyricDev/bite-map-backend.git
```

2. Navigate to the repository's folder and install dependencies.
```
  npm install
```

3. On the root of the repository, add an environment file named **.env**. This file should contain the following variables.
```
    NODE_ENV=development
    PORT=3000
    FOURSQUARE_API_KEY=<foursquare-api-key>
    OPENAI_API_KEY=<openai-api-key>
```

4. You can either use Docker or Node to run locally. The app uses port 3000 by default. Make sure that nothing is running on this port before trying to run the app locally.
    
    - Using Docker.
        
        1. Build the image.
        ```
          docker build -t <image-name>
        ```

        2. Run the image.
        ```
          docker run -p 3000:3000 <image-name>
        ```

        3. Navigate to [http://localhost:3000](http://localhost:3000).

    - Using Node.

        1. Run the script.
        ```
          npm run start
        ```

        2. Navigate to [http://localhost:3000](http://localhost:3000).

## Routes

1. ```POST /api/execute```
    
    Used to parse user input and return location data.

    Accepts a json object with the following format:
    ```json
        {
            query: string,
            latitude?: number,
            longitude?: number
        }
    ```

    Where query is the user query which can be in natural language, and latitude and longitude is the user's location coordinates and is optional. See [limitations](#limitations) on the implications of leaving the coordinates empty.

    If successful, returns a json object: 
    ```
        {
            isError: boolean,
            data: {
                context: {
                    geo_bounds: {
                        circle: {
                            center: {
                                latitude: number,
                                longitude: number
                            }
                            radius: number
                        }
                    }
                },
                results: [
                    {
                        categories: [
                            {
                                icon: {
                                    prefix: string,
                                    suffix: string
                                },
                                id: number,
                                name: string,
                                plural_name: string,
                                short_name: string
                            }
                        ],
                        distance: number,
                        fsq_id: string,
                        hours: {
                            is_local_holiday: boolean,
                            open_now: boolean,
                            display: string
                        },
                        location: {
                            address: string,
                            country: string,
                            cross_street: string,
                            formatted_address: string,
                            locality: string,
                            postcode: string,
                            region: string,
                        },
                        name: string,
                        photos: [
                            {
                                id: string,
                                height: number,
                                width: number,
                                created_at: string,
                                prefix: string,
                                suffix: string,
                            }
                        ],
                        price: number,
                        rating: number,
                        website: string,
                        tips: [
                            {
                                created_at: string,
                                text: string
                            }
                        ]
                    }
                ]
            }
        }
    ```

    If not returns an error object: 
    ```
        {
            isError: boolean,
            data: {
                message: string
            }
        }
    ```

## Limitations

While it is possible to leave the coordinates empty, the api will have no choice but to use the server location as the search area. This can be circumvented if the query has an explicit location entered which the ai model can extrapolate from.