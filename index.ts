import express, { json } from 'express'
import cors from 'cors'
import { apiRoutes } from './api/api-routes';
import { OpenAIService } from './services/openai_service';
import { FourSquareURI } from './helpers/foursquare_uri';
import { FourSquareService } from './services/foursquare_service';
import { ParsedLocationDescription } from './models/parsed_location_description_model';

const app = express();

app.use(cors());
app.use(json());

app.use(apiRoutes);

app.get('/test', async (req, res) => {
    const response = await OpenAIService.parseLocationDescription(req, res);
    // const result = await FourSquareService.searchDiningLocations({
    //     description: response!,
    // })

    const result = FourSquareURI.placeSearchURI({description: response.data as ParsedLocationDescription});
    res.json(result);
})

app.listen(process.env.PORT, () => {
    console.log(`listening ${process.env.PORT}`)
})