import mongoose from "mongoose";
import { DB_NAME } from "../contants.js";


const connectDB = async () =>{
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        console.log(`MONGODB is successfull connected ${connectionInstance.connection.host}` );
    } catch (error) {
        console.log(`error on while connect db in connectDB.js file ${error}`);
        throw error
    }
}


export default connectDB