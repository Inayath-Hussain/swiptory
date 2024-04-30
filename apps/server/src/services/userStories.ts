import { ClientSession, Types } from "mongoose";
import { UserStories } from "../models/userStories";

class UserStoriesService {
    async addNewUser(user_id: Types.ObjectId, session: ClientSession | null = null) {
        const newDoc = new UserStories({ user: user_id, stories: [] })

        // assosiate with session if provided or null
        newDoc.$session(session)

        return newDoc.save();
    }


    async addNewStory(user_id: string, story_id: Types.ObjectId, session: ClientSession | null = null) {

        let doc = await UserStories.findOne({ user: user_id }, {}, { session })

        if (doc === null) return null;

        // add story 
        doc.stories.push(story_id);

        return await doc.save();
    }


    async getUserStories(user_id: string, limit: number | undefined) {
        return await UserStories.findOne({ user: user_id }, { user: 0, _id: 0 }, { limit }).populate("stories", { updatedAt: 0, created_by: 0 })
    }
}



export const userStoriesService = new UserStoriesService();