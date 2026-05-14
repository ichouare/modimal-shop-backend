import compression from "compression";
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import AllRouter from '../src/routes/v1/index';
import connectdb from './config/connectdb';
import { errorHandler } from './middleware/errorHandler';

import z from "zod";
import { userSchema } from "./types/user.schema";
import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import { registry } from "./swagger";



const app = express();



registry.registerPath({
    method: 'get',
    path: '/users/',
    description: 'Get a user by ID',
    summary: 'Get User',
    request: {
      query: z.object({
        id: z.string().openapi({ description: 'ID of the user' }),
      }),
    },
    responses: {
    200: {
      description: 'User found',
      content: {
        'application/json': {
          schema: userSchema,
        },
      },
    },
  },
  tags: ['Users'],
})




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
