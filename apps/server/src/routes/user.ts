import { Router } from "express";

import { getUserInfoController } from "../controllers/user/info";
import { loginController } from "../controllers/user/login";
import { registerController } from "../controllers/user/register";
import { getUserStoriesController } from "../controllers/user/stories";
import { validateAuthRequestBody } from "../middlewares/user/validateAuthRequestBody";
import { authMiddleware } from "../middlewares/auth/authMiddleware";
import { getUserLikedStoriesController } from "../controllers/user/likedStories";

const router = Router();


router.post("/login", validateAuthRequestBody, loginController);

router.post("/register", validateAuthRequestBody, registerController);

router.get("/info", authMiddleware, getUserInfoController);

router.get("/stories", authMiddleware, getUserStoriesController);

router.get("/likedStories", authMiddleware, getUserLikedStoriesController)


export { router as userRouter }