import { connect } from "mongoose";
import { env } from "./env";


export const connectToDb = () => {

    const URL = env.MONGODB_URI

    return new Promise(async resolve => {
        try {
            const connection = await connect(URL)
            if (connection) console.log("Connected to mongodb");

            resolve(connection)
        }
        catch (ex) {
            console.log(ex);
            process.exit(1)
        }
    })
}