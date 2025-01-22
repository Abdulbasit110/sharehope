import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();

// CORS

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

// MIDDLEWARES

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cookieParser());


// ROUTES IMPORT ;

import userRoutes from './routes/user.routes.js';
import ngoRoutes from './routes/ngo.routes.js';

// ROUTES DICLERATION ;

app.use('/api/v1/users',userRoutes);
app.use('/api/v1/ngo', ngoRoutes);

export { app };