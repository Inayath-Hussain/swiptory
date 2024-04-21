import { RequestHandler } from "express";
import { storyService } from "../../services/story";

export const getStoriesController: RequestHandler = async (req, res, next) => {
    let { limit: limitQuery } = req.query;

    const limit = isFinite(limitQuery as unknown as number) ? Number(limitQuery) : 0;

    const data = await storyService.getAllStories(limit)

    return res.status(200).json(data)
}