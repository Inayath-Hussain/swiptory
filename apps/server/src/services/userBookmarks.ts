import { ClientSession, Types } from "mongoose";
import { UserBookmarks } from "../models/userBookmarks";

class UserBookmarkService {

    async addNewUser(user_id: string, session: ClientSession | null = null) {
        const newDoc = new UserBookmarks({ user: user_id, stories: [] });
        newDoc.$session(session)
        return newDoc;
    }



    async getUserBookmarks(user_id: string) {
        const doc = await UserBookmarks.findOne({ user: user_id })

        if (doc === null) return [];

        return doc.stories;
    }


    async addStory(user_id: string, story_id: Types.ObjectId) {
        let doc = await UserBookmarks.findOne({ user: user_id });

        if (doc === null) {
            doc = await this.addNewUser(user_id)
        }

        // if story already bookmarked return doc
        if (doc.stories.includes(story_id)) return doc;


        doc.stories.push(story_id);

        return await doc.save();
    }


    async removeStory(user_id: string, story_id: string) {
        let doc = await UserBookmarks.findOne({ user: user_id });

        if (doc === null) {
            doc = await this.addNewUser(user_id)
        }

        doc.stories = doc.stories.filter(id => id.toString() !== story_id)

        return await doc.save();
    }
}



export const userBookmarkService = new UserBookmarkService();