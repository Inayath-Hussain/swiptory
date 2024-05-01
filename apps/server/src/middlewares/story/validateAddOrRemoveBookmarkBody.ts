import { RequestHandler } from "express";
import { sanitize } from "../sanitizeBase";
import { storyIdValidator } from "./validator";


export interface IAddOrRemoveBookmarkBody {
    story_id: string
}

export const validateAddOrRemoveBookmarkBody: RequestHandler<{}, {}, IAddOrRemoveBookmarkBody> = (req, res, next) => {
    req.body.story_id = sanitize(req.body.story_id);

    const storyValidationResult = storyIdValidator(req.body.story_id);
    if (storyValidationResult.valid === false) return res.status(422).json({ message: storyValidationResult.errorMessage });

    next();
}