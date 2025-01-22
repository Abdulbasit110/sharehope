import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

// ROUTES IMPORT ;

import userRoutes from './routes/user.routes.js';
import ngoRoutes from './routes/ngo.routes.js';
import donationRoutes from './routes/donations.routes.js';
import adminRoutes from './routes/admin.routes.js';
import donationsRoutes from './routes/donations.routes.js';

const app = express();

// CORS

const allowedOrigins = ["http://localhost:5174" , "https://sharehope.vercel.app"];

app.use(cors({
  origin: (origin, callback) => {
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true);
    } else {
      console.error(`Blocked by CORS: ${origin}`);
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization'],
  exposedHeaders: ['Authorization'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cookieParser());


<<<<<<< HEAD
// ROUTES IMPORT ;

import userRoutes from './routes/user.routes.js';
import ngoRoutes from './routes/ngo.routes.js';
import donationRoutes from './routes/donations.routes.js';

// ROUTES DICLERATION ;

app.use('/api/v1/users', userRoutes);
app.use('/api/v1/ngo', ngoRoutes);
app.use('/api/v1/donation', donationRoutes);
=======
// ROUTES DICLERATION ;

app.use('/api/users', userRoutes);
app.use('/api/ngo', ngoRoutes);
app.use('/api/donation', donationRoutes);
app.use('/api/users', userRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/donation', donationsRoutes);
>>>>>>> 75edaa6b86e947a996b1e0be398f0b8851011ed4

export { app };