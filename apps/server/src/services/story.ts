import { IAddStoryBody } from "../middlewares/story/validateAddStoryBody";
import { Story } from "../models/story";

class StoryService {
    async addStory(user_id: string, { category, slides }: IAddStoryBody) {
        const storyDoc = new Story({ slides, category, created_by: user_id })

        return await storyDoc.save()
    }


    async getAllStories() {
        return await Story.aggregate([
            { $match: { _id: { $exists: true } } },
            { $project: { updatedAt: 0, created_by: 0 } },
            { $group: { _id: "$slides.category", stories: { $push: "$$ROOT" }, } },
            { $addFields: { _id: { $arrayElemAt: ["$_id", 0] } } }
        ])
    }
}



export const storyService = new StoryService();