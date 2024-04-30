import { Router } from "express";

import { authMiddleware } from "../middlewares/auth/authMiddleware";

import { validateAddStoryBody } from "../middlewares/story/validateAddStoryBody";
import { addStoryController } from "../controllers/story/addStory";

import { getStoriesController } from "../controllers/story/getStories";

import { validateEditStoryBody } from "../middlewares/story/validateEditStoryBody";
import { editStoryController } from "../controllers/story/editStory";

import { validateLikeOrUnlikeStoryBody } from "../middlewares/story/validateLikeOrUnlikeStoryBody";
import { likeStoryController } from "../controllers/story/likeStory";
import { unlikeStoryController } from "../controllers/story/unlikeStory";


const router = Router();


router.post("/", authMiddleware, validateAddStoryBody, addStoryController)

router.get("/", getStoriesController)

router.put("/", authMiddleware, validateEditStoryBody, editStoryController)

router.put("/like", authMiddleware, validateLikeOrUnlikeStoryBody, likeStoryController)

router.put("/unlike", authMiddleware, validateLikeOrUnlikeStoryBody, unlikeStoryController)


export { router as storyRouter }