import express, { json } from 'express'
import cors from 'cors'
import { apiRoutes } from './api/api-routes';

const app = express();

app.use(cors());
app.use(json());

app.use(apiRoutes);

app.listen(process.env.PORT, () => {
    console.log(`listening ${process.env.PORT}`)
})