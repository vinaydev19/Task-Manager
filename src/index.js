import dotenv from 'dotenv'
import connectDB from './db/connectDB.js'
import { app } from './app.js'


dotenv.config({
    path: './env'
})


connectDB().then(()=>{
    app.on("error",(error)=>{
        console.log(`error on express app in index.js || ${error}`);
        throw error
    })

    app.listen(process.env.PORT || 8000, ()=>{
        console.log(`app running on port no : ${process.env.PORT}`);
    })
}).catch((error)=>{
    console.log(`mongodb connection failed in index.js || ${error}`);
    
})