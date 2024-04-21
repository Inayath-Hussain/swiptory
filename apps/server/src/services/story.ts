import { IAddStoryBody } from "../middlewares/story/validateAddStoryBody";
import { IStory, Story } from "../models/story";



interface IGetAllStoriesResult {
    data: {
        [k: string]: Pick<IStory, "category" | "createdAt" | "slides">[]
    }
}



class StoryService {
    async addStory(user_id: string, { category, slides }: IAddStoryBody) {
        const storyDoc = new Story({ slides, category, created_by: user_id })

        return await storyDoc.save()
    }


    // async getAllStories() {
    //     const data = await Story.aggregate([
    //         { $match: { _id: { $exists: true } } },
    //         { $project: { updatedAt: 0, created_by: 0 } },
    //         { $group: { _id: "$category", stories: { $push: "$$ROOT" }, } }
    //         // { $project: { data: { $arrayToObject: "$$ROOT" } } }
    //     ])

    //     const result: Record<string, any> = {};

    //     data.forEach(d => {
    //         result[d._id] = d.stories
    //     })

    //     return result
    // }



    async getAllStories() {
        const result = await Story.aggregate<IGetAllStoriesResult>([
            // match all documents
            { $match: { _id: { $exists: true } } },

            // exclude updatedAt and created_by fields
            { $project: { updatedAt: 0, created_by: 0 } },

            // group documents by category
            { $group: { _id: "$category", stories: { $push: "$$ROOT" }, } },

            // rename _id and stories field to k and v
            { $addFields: { k: "$_id", v: "$stories" } },
            { $project: { _id: 0, stories: 0 } },

            // push all documents into a field called data
            { $group: { _id: null, data: { $push: "$$ROOT" } } },

            // convert array of documents containing k(category) and v(array of documents whose category is "k") into a document with k as fieldName and v as value
            { $project: { data: { $arrayToObject: "$data" }, _id: 0 } }
        ])


        return result[0]
    }

}



export const storyService = new StoryService();