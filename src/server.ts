import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import compression from "compression"

import AllRouter from '../src/routes/v1/index';
import connectdb from './config/connectdb';
import { errorHandler } from './middlwares/errorHandler';

const app = express();

// middlewares
app.use(express.json());
app.use(compression())
app.set("query parser", "extended") // add this line to parser query string if we have embbding data

app.use(
    cors({
        credentials: true, // Allow sending cookies
        origin: 'http://localhost:3000',
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    })
);

app.use(cookieParser()); // parser cookies

connectdb();

app.use('/api/v1', AllRouter);
app.get('/', (req, res) => {

    return res.status(200).json({ message: 'this message from server test' });
});

app.use(errorHandler);

app.listen(process.env.PORT, () => {
    console.log('server listen to PORT', process.env.PORT);
});
