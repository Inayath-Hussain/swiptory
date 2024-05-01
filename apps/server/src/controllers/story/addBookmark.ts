import { RequestHandler } from "express";
import { IAddOrRemoveBookmarkBody } from "../../middlewares/story/validateAddOrRemoveBookmarkBody";
import { storyService } from "../../services/story";
import { Ierror } from "../errorHandler";
import { userBookmarkService } from "../../services/userBookmarks";
import { tryCatchWrapper } from "../../utilities/requestHandler/tryCatchWrapper";


const controller: RequestHandler<{}, {}, IAddOrRemoveBookmarkBody> = async (req, res, next) => {
    const user_id = req.user_id as string;

    const { story_id } = req.body;


    const storyDoc = await storyService.getStoryById(story_id);

    if (storyDoc === null) return next({ statusCode: 400, message: "Story doesn't exist" } as Ierror);

    await userBookmarkService.addStory(user_id, storyDoc._id)

    return res.status(201).json({ message: "success" });
}




export const addBookmarkController = tryCatchWrapper(controller);