import { IAddStoryBody } from "../middlewares/story/validateAddStoryBody";
import { IStory, Story } from "../models/story";
import { categoryService } from "./category";


type IStoryData = Pick<IStory, "category" | "createdAt" | "slides">




class StoryService {
    async addStory(user_id: string, { category, slides }: IAddStoryBody) {
        const storyDoc = new Story({ slides, category, created_by: user_id })

        return await storyDoc.save()
    }



    async getStories(limit: number, category: string) {
        const data: Record<string, IStoryData[]> = {};

        // get all categories
        const { categories } = await categoryService.getCategoryNames();

        if (categories.includes(category)) return await Story.find({ category }, { updatedAt: 0, created_by: 0 }, { limit }).exec()

        // get documents of each category
        await Promise.all(categories.map(async (c) => {
            const result = await Story.find({ category: c }, { updatedAt: 0, created_by: 0 }, { limit }).exec()
            data[c] = result
        }))


        return data
    }

}



export const storyService = new StoryService();