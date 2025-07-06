import cors from 'cors'

const corsOptions :cors.CorsOptions ={
    origin : "*",
    methods : ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}

export default corsOptions