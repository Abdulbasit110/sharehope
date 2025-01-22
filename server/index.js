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
