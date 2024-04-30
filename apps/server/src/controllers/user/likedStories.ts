import { RequestHandler } from "express";
import { tryCatchWrapper } from "../../utilities/requestHandler/tryCatchWrapper";
import { userLikedStoriesService } from "../../services/userLikedStories";

const controller: RequestHandler = async (req, res, next) => {
    const user_id = req.user_id as string;

    const data = await userLikedStoriesService.getAllLikedStoriesOfUser(user_id);

    return res.status(200).json(data)
}




export const getUserLikedStoriesController = tryCatchWrapper(controller);