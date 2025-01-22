import dotenv from "dotenv";
import connectDB from "./db/index.js";
import {app} from './app.js'

// ENV CONFIG

dotenv.config({ path: "./env" });

// DATABASE CONNECTION

connectDB()
.then(()=>{
    app.listen(process.env.PORT || 8000 , ()=>{
        console.log(`Your Server is Listen Port At : ${process.env.PORT}`)
    })
})
.catch((err)=>{
    console.log(`Connection Failed : ${err}`);
    
});

//just testing
export default app


































// import express from 'express';
// import cors from 'cors';
// import dotenv from 'dotenv';
// import mongoose from 'mongoose';

// import authRoutes from './routes/auth.js';
// // import userRoutes from './routes/';
// import ngoRoutes from './routes/ngos.js';
// import donationRoutes from './routes/donations.js';
// import disposalRoutes from './routes/disposals.js';
// import brandRoutes from './routes/brands.js';
// import voucherRoutes from './routes/vouchers.js';

// dotenv.config();

// const app = express();

// app.use(cors());
// app.use(express.json());

// // Connect to MongoDB
// mongoose.connect(process.env.MONGODB_URI)
//   .then(() => console.log('Connected to MongoDB'))
//   .catch((err) => console.error('MongoDB connection error:', err));

// // Routes
// app.use('/api/auth', authRoutes);
// // app.use('/api/users', userRoutes);
// app.use('/api/ngos', ngoRoutes);
// app.use('/api/donations', donationRoutes);
// app.use('/api/disposals', disposalRoutes);
// app.use('/api/brands', brandRoutes);
// app.use('/api/vouchers', voucherRoutes);

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });