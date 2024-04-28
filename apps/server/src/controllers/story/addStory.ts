import { RequestHandler } from "express";
import { IAddStoryBody } from "../../middlewares/story/validateAddStoryBody";
import { storyService } from "../../services/story";
import { startSession } from "mongoose";
import { userStoriesService } from "../../services/userStories";
import { Ierror } from "../errorHandler";
import { tryCatchWrapper } from "../../utilities/requestHandler/tryCatchWrapper";



const controller: RequestHandler<{}, {}, IAddStoryBody> = async (req, res, next) => {
    const user_id = req.user_id as string;

    const session = await startSession();

    session.startTransaction();

    try {
        const storyDoc = await storyService.addStory(user_id, req.body, session)

        await userStoriesService.addNewStory(user_id, storyDoc._id, session)

        await session.commitTransaction()

        return res.status(201).json({ message: "success" })
    }
    catch (ex) {
        await session.abortTransaction();
        next({ statusCode: 500, message: "Internal Server Error" } as Ierror)
    }
    finally {
        await session.endSession();
    }
}



export const addStoryController = tryCatchWrapper(controller);