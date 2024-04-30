import { InferSchemaType, Schema, model } from "mongoose";

const userLikedStoriesSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: "user", required: true, index: true },
    stories: [
        { type: Schema.Types.ObjectId, ref: "story", required: true }
    ]
});



export type IUserLikedStories = InferSchemaType<typeof userLikedStoriesSchema>;

export const UserLikedStories = model("userLikedStories", userLikedStoriesSchema);