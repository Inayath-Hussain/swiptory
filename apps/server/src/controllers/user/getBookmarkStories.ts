import { RequestHandler } from "express";
import { userBookmarkService } from "../../services/userBookmarks";
import { tryCatchWrapper } from "../../utilities/requestHandler/tryCatchWrapper";

const controller: RequestHandler = async (req, res, next) => {
    const user_id = req.user_id as string;

    let { limit: limitQuery } = req.query;

    const limit = isFinite(limitQuery as unknown as number) ? Number(limitQuery) : undefined;

    const stories = await userBookmarkService.getUserBookmarkStories(limit, user_id);

    return res.status(200).json(stories);
}



export const getBookmarkStoriesController = tryCatchWrapper(controller);