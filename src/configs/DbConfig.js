import mongoose from 'mongoose';
import 'dotenv/config'

export function dbConfig(){
    mongoose.connect(process.env.DB_URL);
     const dbconnection=mongoose.connection;
     dbconnection.once('connected',()=>{
        console.log("db is connected")
     })
     dbconnection.on('error',()=>{
        console.log("error in db connection")
     })
}