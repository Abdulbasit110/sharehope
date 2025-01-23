import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

// ROUTES IMPORT ;

import userRoutes from './routes/user.routes.js';
import ngoRoutes from './routes/ngo.routes.js';
import donationsRoutes from './routes/donations.routes.js';
import adminRoutes from './routes/admin.routes.js';

const app = express();

// CORS

const allowedOrigins = ["http://localhost:5173" , "https://sharehope.vercel.app"];

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
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
}));


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cookieParser());


// ROUTES DICLERATION ;

app.use('/api/users', userRoutes);
app.use('/api/ngo', ngoRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/donation', donationsRoutes);


export { app };