import { RequestHandler } from "express";

import { userStoriesService } from "../../services/userStories";
import { tryCatchWrapper } from "../../utilities/requestHandler/tryCatchWrapper";


const controller: RequestHandler = async (req, res, next) => {
    const user_id = req.user_id as string;
    const { limit: limitQuery } = req.query;

    const limit = isFinite(limitQuery as unknown as number) ? Number(limitQuery) : undefined;

    const stories = await userStoriesService.getUserStories(user_id, limit);

    return res.status(200).json(stories);
}




export const getUserStoriesController = tryCatchWrapper(controller);