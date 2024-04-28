import { Router } from "express";

import { authMiddleware } from "../middlewares/auth/authMiddleware";

import { validateAddStoryBody } from "../middlewares/story/validateAddStoryBody";
import { addStoryController } from "../controllers/story/addStory";

import { getStoriesController } from "../controllers/story/getStories";

import { validateEditStoryBody } from "../middlewares/story/validateEditStoryBody";
import { editStoryController } from "../controllers/story/editStory";


const router = Router();


router.post("/", authMiddleware, validateAddStoryBody, addStoryController)


router.get("/", getStoriesController)


router.put("/", authMiddleware, validateEditStoryBody, editStoryController)


export { router as storyRouter }