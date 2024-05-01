import { RequestHandler } from "express";
import { tryCatchWrapper } from "../../utilities/requestHandler/tryCatchWrapper";
import { storyService } from "../../services/story";

const controller: RequestHandler = async (req, res, next) => {
    const { id } = req.params;

    const doc = await storyService.getStoryById(id);

    if (doc === null) return res.status(400).json({ message: "story doesn't exist" })

    return res.status(200).json(doc);
}


export const getStoryController = tryCatchWrapper(controller);