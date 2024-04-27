import { RequestHandler } from "express";
import { storyService } from "../../services/story";

export const getStoriesController: RequestHandler = async (req, res, next) => {
    let { limit: limitQuery, category: categoryQuery } = req.query;

    const limit = isFinite(limitQuery as unknown as number) ? Number(limitQuery) : undefined;
    const category = typeof categoryQuery === "string" ? categoryQuery.trim() : ""

    const data = await storyService.getStories(limit, category)

    return res.status(200).json(data)
}