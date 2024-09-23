import express from 'express'
import categoryRoute from './routes/categoryRoute/categoryRoute.js'
import { handleGenericError } from './handles/handleGenericError.js';
import { handlingJsonError } from './handles/handlingJsonError.js';
import { handleOrmError } from './handles/handleOrmError.js';

const app = express();

app.use(express.json());

// Handling iniciar
app.use(handlingJsonError);


//Rotas
app.use(categoryRoute);


// Handling erros
app.use(handleOrmError);
app.use(handleGenericError);


app.listen(3000, () => {
    console.log('our app is running locally...');
});