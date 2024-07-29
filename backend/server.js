// const express = require('express') // old syntax  
// afsarm1606 afsarm1606

import express from 'express'; // got to package.json and add   "type": "module", after scripts
import dotenv from 'dotenv'
import { connectDB } from './config/db.js'; // .js is important if not it will crash 
import productRoutes from "./routes/product.route.js"

dotenv.config(); 

const app = express(); 

app.use(express.json()); // allows us to accept json data in the req.body 

app.use("/api/products",productRoutes);

app.listen(5000, () => {
    connectDB();
    console.log('server started at http://localhost:5000')
})

