import express, { json } from 'express'
import cors from 'cors'
import { apiRoutes } from './api/api-routes';
import { OpenAIService } from './services/openai_service';

const app = express();

app.use(cors());
app.use(json());

app.use(apiRoutes);

app.get('/test', async (req, res) => {
    const response = await OpenAIService.parseLocationDescription(req, res);
    res.json(response);
})

app.listen(process.env.PORT, () => {
    console.log(`listening ${process.env.PORT}`)
})