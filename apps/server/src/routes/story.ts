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

import { validateAddOrRemoveBookmarkBody } from "../middlewares/story/validateAddOrRemoveBookmarkBody";
import { addBookmarkController } from "../controllers/story/addBookmark";
import { removeBookmarkController } from "../controllers/story/removeBookmark";

import { getStoryController } from "../controllers/story/getStory";


const router = Router();


router.post("/", authMiddleware, validateAddStoryBody, addStoryController);

router.get("/", getStoriesController);

router.get("/:id", getStoryController);

router.put("/", authMiddleware, validateEditStoryBody, editStoryController);

router.put("/like", authMiddleware, validateLikeOrUnlikeStoryBody, likeStoryController);

router.put("/unlike", authMiddleware, validateLikeOrUnlikeStoryBody, unlikeStoryController);

router.put("/addBookmark", authMiddleware, validateAddOrRemoveBookmarkBody, addBookmarkController);

router.put("/removeBookmark", authMiddleware, validateAddOrRemoveBookmarkBody, removeBookmarkController);


export { router as storyRouter }