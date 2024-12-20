

import express, { json } from 'express';
import dotenv from 'dotenv';
import { corsMiddleware } from './middlewares/cors.js';

import { connectDB } from './config/db.config.js';
import { indexRoutes } from './routes/index.routes.js';
import { errorHandler } from './err/err.js';

import { PORT } from './config/port.config.js';

dotenv.config();

const app = express();

app.use(json());
app.disable('x-powered-by')
connectDB();
app.use(corsMiddleware())

app.use("/api", indexRoutes);


app.get("*", (req, res, next) => {
    res.json("Route not found");
});


app.use(errorHandler);



app.listen(PORT, () => {
    console.log(`Server listening on port http://localhost:${PORT}`);
})











