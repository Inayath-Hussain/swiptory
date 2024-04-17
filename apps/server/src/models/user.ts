import { InferSchemaType, Schema, model } from "mongoose";


const userSchema = new Schema({
    username: {
        type: String, required: true
    },
    password: {
        type: String, required: true
    },
    profilePic: {
        type: String, required: true,
        default: "https://firebasestorage.googleapis.com/v0/b/swiptory-9ae2a.appspot.com/o/default%20profile%20picture.png?alt=media&token=e4f6f921-cb06-4900-a034-ab66c397da4a"
    }
})


export type IUser = InferSchemaType<typeof userSchema>;

export const User = model("user", userSchema);