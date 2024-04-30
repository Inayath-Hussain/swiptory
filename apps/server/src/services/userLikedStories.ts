import { ClientSession, Types } from "mongoose";
import { IUserLikedStories, UserLikedStories } from "../models/userLikedStories";
import { ServiceError } from "./error";

class UserLikedStoriesService {

    async addNewUser(user_id: Types.ObjectId, session: ClientSession | null = null) {
        const newDoc = new UserLikedStories({ user: user_id, stories: [] })

        newDoc.$session(session);
        return await newDoc.save();
    }



    async addStory(user_id: string, story_id: Types.ObjectId, session: ClientSession | null = null): Promise<IUserLikedStories | ServiceError> {
        let doc = await UserLikedStories.findOne({ user: user_id }, {}, { session });

        // if doc for given user_id doesn't exist then create new
        if (doc === null) {
            doc = await this.addNewUser(story_id, session)
        }

        if (doc.stories.includes(story_id) === true) return new ServiceError("user already liked story");

        doc.stories.push(story_id);

        return await doc.save();
    }


    async removeStory(user_id: string, story_id: Types.ObjectId, session: ClientSession | null = null): Promise<IUserLikedStories | ServiceError> {
        let doc = await UserLikedStories.findOne({ user: user_id }, {}, { session });

        // if doc for given user_id doesn't exist then create new
        if (doc === null) {
            doc = await this.addNewUser(story_id, session)
        }

        if (doc.stories.includes(story_id) === false) return new ServiceError("user didn't like the story")

        doc.stories = doc.stories.filter(s => s.toString() !== story_id.toString());

        return await doc.save();
    }
}



export const userLikedStoriesService = new UserLikedStoriesService();