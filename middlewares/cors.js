import cors from 'cors'


const ACCEPTED_ORIGINS = [
    'http://localhost:3000'
] // Aqui podemos añadir mas dominios si fuesen requeridos



export const corsMiddleware = ({ acceptedOrigins = ACCEPTED_ORIGINS } = {}) => cors({

    origin: (origin, callback) => {
        if (acceptedOrigins.includes(origin)) {
            return callback(null, true)
        }
        if (!origin) {
            return callback(null, true)

        }
        return callback(new Error('Origin not allowed by CORS'))
    }
})   