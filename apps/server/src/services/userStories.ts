import { ClientSession, Types } from "mongoose";
import { UserStories } from "../models/userStories";

class UserStoriesService {
    async addNewUser(user_id: string, session: ClientSession | null = null) {
        const newDoc = new UserStories({ user: user_id, stories: [] })

        // assosiate with session if provided or null
        newDoc.$session(session)

        return newDoc.save();
    }


    async addNewStory(user_id: string, story_id: Types.ObjectId, session: ClientSession | null = null) {

        let doc = await UserStories.findOne({ user: user_id }, {}, { session })

        // if a document isn't already created for user, create one
        if (doc === null) {
            doc = await this.addNewUser(user_id, session)
        }

        // add story 
        doc.stories.push(story_id);

        return await doc.save();
    }


    async getUserStories(user_id: string) {
        return await UserStories.findOne({ user: user_id }).populate("stories")
    }
}



export const userStoriesService = new UserStoriesService();