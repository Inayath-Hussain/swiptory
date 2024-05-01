import { RequestHandler } from "express";
import { tryCatchWrapper } from "../../utilities/requestHandler/tryCatchWrapper";
import { IAddOrRemoveBookmarkBody } from "../../middlewares/story/validateAddOrRemoveBookmarkBody";
import { userBookmarkService } from "../../services/userBookmarks";

const controller: RequestHandler<{}, {}, IAddOrRemoveBookmarkBody> = async (req, res, next) => {
    const user_id = req.user_id as string;

    const { story_id } = req.body;

    await userBookmarkService.removeStory(user_id, story_id);

    return res.status(200).json({ message: "success" });
}



export const removeBookmarkController = tryCatchWrapper(controller);