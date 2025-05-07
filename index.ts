import express, { json } from 'express'
import cors from 'cors'
import { apiRoutes } from './api/api-routes';
import { OpenAIService } from './services/openai_service';
import { FourSquareURI } from './helpers/foursquare_uri';
import { FourSquareService } from './services/foursquare_service';
import { ParsedLocationDescription } from './models/parsed_location_description_model';

const app = express();

const origins = [
    'https://bite-map.vercel.app',
];

if (process.env.NODE_ENV === 'development') {
    origins.push('http://localhost:5173');
}

app.use(cors({
    origin: origins
}));
app.use(json());

app.use(apiRoutes);

app.get('/', async (req, res) => {
    res.json('This is the backend for Bite Map')
})

app.listen(process.env.PORT, () => {
    console.log(`listening ${process.env.PORT}`)
})

if (process.env.NODE_ENV !== 'development') {
    const minutes = 14;
    const keepAliveURI = 'https://bite-map-backend.onrender.com/'
    
    setInterval(() => {
        fetch(keepAliveURI).then(() => console.log('keep alive'))
    },
        minutes * 10000
    )
}