import { RequestHandler } from "express";

import { storyIdValidator } from "./validator";
import { sanitize } from "../sanitizeBase";


export interface ILikeStoryBody {
    story_id: string
}

export const validateLikeOrUnlikeStoryBody: RequestHandler<{}, {}, ILikeStoryBody> = (req, res, next) => {

    req.body.story_id = sanitize(req.body.story_id);

    const storyIdValidationResult = storyIdValidator(req.body.story_id);

    if (storyIdValidationResult.valid === false) return res.status(422).json({ message: storyIdValidationResult.errorMessage })


    return next();
}