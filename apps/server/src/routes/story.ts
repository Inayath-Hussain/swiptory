import { Router } from "express";
import { tryCatchWrapper } from "../utilities/requestHandler/tryCatchWrapper";
import { validateAddStoryBody } from "../middlewares/story/validateAddStoryBody";
import { authMiddleware } from "../middlewares/auth/authMiddleware";
import { addStoryController } from "../controllers/story/addStory";


const router = Router();


router.post("/", tryCatchWrapper(authMiddleware), tryCatchWrapper(validateAddStoryBody))
router.post("/", tryCatchWrapper(addStoryController))



export { router as storyRouter }