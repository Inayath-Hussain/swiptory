import { IAddStoryBody } from "../middlewares/story/validateAddStoryBody";
import { Story } from "../models/story";

class StoryService {
    async addStory(user_id: string, slides: IAddStoryBody) {
        const storyDoc = new Story({ slides, created_by: user_id })

        return await storyDoc.save()
    }
}



export const storyService = new StoryService();