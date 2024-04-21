import { RequestHandler } from "express";
import { storyService } from "../../services/story";

export const getStoriesController: RequestHandler = async (req, res, next) => {
    const data = await storyService.getAllStories()

    return res.status(200).json(data)
}