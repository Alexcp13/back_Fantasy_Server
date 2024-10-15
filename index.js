
import express, { json } from 'express';
import dotenv from 'dotenv';
import { corsMiddleware } from './middlewares/cors.js';
import { PORT } from './config/port.config.js';
import { connectDB } from './config/db.config.js';
import { indexRoutes } from './routes/index.routes.js';
import { errorHandler, errorRoute } from './err/err.js';


dotenv.config();

const app = express();

app.use(corsMiddleware())

app.use(json());
app.disable('x-powered-by')

connectDB();




app.use("/api", indexRoutes);

app.use(errorHandler);
app.use(errorRoute)

app.use("*", (req, res, next) => {
    return res.status(404).json("Route not found")
})





app.listen(PORT, () => {
    console.log(`Server listening on port http://localhost:${PORT}`);
})