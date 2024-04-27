import { InferSchemaType, Schema, model } from "mongoose";

const userStoriesSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: "users", required: true, index: true },

    stories: {
        type: [Schema.Types.ObjectId], ref: "stories", required: true,
        default: []
    }
});

export type IUserStories = InferSchemaType<typeof userStoriesSchema>;

export const UserStories = model("userStories", userStoriesSchema);