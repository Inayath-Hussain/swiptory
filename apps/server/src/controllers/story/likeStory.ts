import { RequestHandler } from "express";
import { startSession } from "mongoose";

import { ILikeStoryBody } from "../../middlewares/story/validateLikeOrUnlikeStoryBody";
import { tryCatchWrapper } from "../../utilities/requestHandler/tryCatchWrapper";
import { userLikedStoriesService } from "../../services/userLikedStories";
import { storyService } from "../../services/story";
import { Ierror } from "../errorHandler";
import { ServiceError } from "../../services/error";

const controller: RequestHandler<{}, {}, ILikeStoryBody> = async (req, res, next) => {
    const user_id = req.user_id as string;

    const { story_id } = req.body;

    const session = await startSession();
    session.startTransaction();
    try {
        const storyDoc = await storyService.likeStory(story_id, session);

        if (storyDoc === null) throw new ServiceError("story doesn't exist");

        const userLikedStoriesDoc = await userLikedStoriesService.addStory(user_id, storyDoc._id, session);

        if (userLikedStoriesDoc instanceof ServiceError) throw userLikedStoriesDoc;

        await session.commitTransaction();

        res.status(200).json({ message: "success" });

    }
    catch (ex) {
        await session.abortTransaction();

        if (ex instanceof ServiceError) next({ message: ex.message, statusCode: 400 } as Ierror);
        else next({ message: "Internal server error", statusCode: 500 } as Ierror);
    }
    finally {
        await session.endSession();
    }

}




export const likeStoryController = tryCatchWrapper(controller);