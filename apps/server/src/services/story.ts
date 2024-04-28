import { ClientSession } from "mongoose";
import { IAddStoryBody } from "../middlewares/story/validateAddStoryBody";
import { IStory, Story } from "../models/story";
import { categoryService } from "./category";


type IStoryData = Pick<IStory, "category" | "createdAt" | "slides">


type UpdateStoryPayload = Partial<IStory> & { _id: string }


class StoryService {
    async addStory(user_id: string, { category, slides }: IAddStoryBody, session: ClientSession | null = null) {
        const storyDoc = new Story({ slides, category, created_by: user_id })

        storyDoc.$session(session)

        return await storyDoc.save()
    }



    async getStories(limit: number | undefined, category: string) {
        const data: Record<string, IStoryData[]> = {};

        // get all categories
        const { categories } = await categoryService.getCategoryNames();

        if (categories.includes(category)) {
            const data = await Story.find({ category }, { updatedAt: 0, created_by: 0 }, { limit }).exec()
            return { [category]: data }
        }

        // get documents of each category
        await Promise.all(categories.map(async (c) => {
            const result = await Story.find({ category: c }, { updatedAt: 0, created_by: 0 }, { limit }).exec()
            data[c] = result
        }))


        return data
    }



    async updateStory({ _id, slides, category }: UpdateStoryPayload, user_id: string) {
        console.log(user_id)
        return await Story.findOneAndUpdate({ _id, created_by: user_id }, { slides, category }, { returnOriginal: false })
    }

}



export const storyService = new StoryService();