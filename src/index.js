import mongoose from "mongoose";
import { DB_NAME } from "./constants";

// DB connection (iffis)

(async () => {
    try {
        await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`)
    } catch (error) {
        console.error("ERROR: " , error)
        throw err
    }

})()