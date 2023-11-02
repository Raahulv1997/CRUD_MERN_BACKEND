import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import {dbConfig} from './src/configs/DbConfig.js';
import employeeRouter from './src/routers/employeeRouter.js';
const app= express();
dbConfig();
app.use(cors());
app.use(express.json());
app.use(employeeRouter)






app.listen(process.env.SERVER_PORT,()=>{
    console.log(`Server is running at ${process.env.SERVER_PORT}`)
})