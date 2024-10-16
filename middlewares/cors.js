import cors from 'cors'


const ACCEPTED_ORIGINS = [
    'http://localhost:5173',
    'http://localhost:3000',
    'https://back-fantasy-server.vercel.app/api'

] // Aqui podemos añadir mas dominios si fuesen requeridos



export const corsMiddleware = ({ acceptedOrigins = ACCEPTED_ORIGINS } = {}) => cors({
    origin: (origin, callback) => {
        if (acceptedOrigins.includes(origin) || !origin) {
            return callback(null, true);
        }
        return callback(new Error('Origin not allowed by CORS'));
    },
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 204
});