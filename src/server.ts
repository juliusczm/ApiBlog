import express from 'express'
import categoryRoute from './routes/categoryRoute/categoryRoute.js'
//import { jsonErrorHandling } from './handlers/jsonErrorHandler.js';

const app = express();

app.use(express.json());

app.use(categoryRoute);

app.listen(3000, () => {
    console.log('our app is running locally...');
});

//debugger;

