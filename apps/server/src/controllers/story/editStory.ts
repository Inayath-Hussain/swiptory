import { RequestHandler } from "express";
import { IEditStoryBody } from "../../middlewares/story/validateEditStoryBody";
import { storyService } from "../../services/story";
import { tryCatchWrapper } from "../../utilities/requestHandler/tryCatchWrapper";



const controller: RequestHandler<{}, {}, IEditStoryBody> = async (req, res, next) => {
    const user_id = req.user_id as string;

    const { story_id, category, slides } = req.body;

    const newDoc = await storyService.updateStory({ _id: story_id, category, slides }, user_id);

    if (newDoc === null) return res.status(400).json({ message: "Story doesn't exist" });

    return res.status(200).json({ message: "success" });
}



export const editStoryController = tryCatchWrapper(controller);