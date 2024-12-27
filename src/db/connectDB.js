import mongoose from "mongoose";
import { DB_NAME } from "../contants.js";


const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        console.log(`DB connection successfull || db host || ConnectDB.js file ${connectionInstance.connection.host}`);
        
    } catch (error) {
        console.log(`connection failed in db || errror on ConnectDB.js file || ${error}`);
        throw error
    }
}

export default connectDB