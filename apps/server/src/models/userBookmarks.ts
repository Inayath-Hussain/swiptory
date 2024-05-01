import { InferSchemaType, Schema, model } from "mongoose";

const userBookmarksSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: "user", required: true, index: true },

    stories: [
        { type: Schema.Types.ObjectId, ref: "story", required: true, default: [] }
    ]
})




export type IUserBookmarksSchema = InferSchemaType<typeof userBookmarksSchema>;


export const UserBookmarks = model("userBookmarks", userBookmarksSchema);