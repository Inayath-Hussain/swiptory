import { RequestHandler } from "express";
import { IAddStoryBody } from "../../middlewares/story/validateAddStoryBody";
import { storyService } from "../../services/story";



export const addStoryController: RequestHandler<{}, {}, IAddStoryBody> = async (req, res, next) => {
    const user_id = req.user_id as string;

    await storyService.addStory(user_id, req.body)

    return res.status(201).json({ message: "success" })
}