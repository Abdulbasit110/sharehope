import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();

// CORS

const allowedOrigins = ["http://localhost:5174"];

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

// MIDDLEWARES

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cookieParser());


// ROUTES IMPORT ;

import userRoutes from './routes/user.routes.js';
import ngoRoutes from './routes/ngo.routes.js';
import adminRoutes from './routes/admin.routes.js';
import donationsRoutes from './routes/donations.routes.js';

// ROUTES DICLERATION ;

app.use('/api/v1/users', userRoutes);
app.use('/api/v1/ngo', ngoRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/admin', adminRoutes);
app.use('/api/v1/donation', donationsRoutes);

export { app };