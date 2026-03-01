import express from 'express';
import cors from 'cors'; 
import dotenv from 'dotenv';
dotenv.config();
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import helmet from 'helmet';
import userRoutes from './routes/user.route.js';
import productRoutes from './routes/product.route.js';


const app = express();
app.use(cors({
    origin: [process.env.FRONTEND_URL, 'http://localhost:5174'],
    credentials: true
}))

app.use(express.json());
app.use(cookieParser());
app.use(morgan('dev'));
app.use(helmet({
    crossOriginEmbedderPolicy: false
}))

app.use('/api/user', userRoutes);
app.use('/api/product', productRoutes);



export default app;

