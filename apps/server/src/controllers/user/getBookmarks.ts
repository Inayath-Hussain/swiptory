import { RequestHandler } from "express";
import { userBookmarkService } from "../../services/userBookmarks";
import { tryCatchWrapper } from "../../utilities/requestHandler/tryCatchWrapper";

const controller: RequestHandler = async (req, res, next) => {
    const user_id = req.user_id as string;

    const bookmarks = await userBookmarkService.getUserBookmarks(user_id);

    return res.status(200).json({ bookmarks });
}



export const getUserBookmarksController = tryCatchWrapper(controller);