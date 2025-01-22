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
<<<<<<< HEAD
import ngoRoutes from './routes/ngo.routes.js';
=======
import adminRoutes from './routes/admin.routes.js';
import donationsRoutes from './routes/donations.routes.js';
>>>>>>> 98aa065f38e7bea363c441f540fda6e5dad3f391

// ROUTES DICLERATION ;

app.use('/api/v1/users',userRoutes);
<<<<<<< HEAD
app.use('/api/v1/ngo', ngoRoutes);
=======
app.use('/api/v1/admin',adminRoutes);
app.use('/api/v1/donation',donationsRoutes);
>>>>>>> 98aa065f38e7bea363c441f540fda6e5dad3f391

export { app };