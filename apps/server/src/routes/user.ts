import { Router } from "express";
import { getUserInfoController } from "../controllers/user/info";
import { loginController } from "../controllers/user/login";
import { registerController } from "../controllers/user/register";
import { getUserStoriesController } from "../controllers/user/stories";
import { validateAuthRequestBody } from "../middlewares/user/validateAuthRequestBody";
import { authMiddleware } from "../middlewares/auth/authMiddleware";
import { tryCatchWrapper } from "../utilities/requestHandler/tryCatchWrapper";

const router = Router();


router.post("/login", validateAuthRequestBody, tryCatchWrapper(loginController));

router.post("/register", validateAuthRequestBody, tryCatchWrapper(registerController));

router.get("/info", tryCatchWrapper(authMiddleware), tryCatchWrapper(getUserInfoController));

router.get("/stories", tryCatchWrapper(authMiddleware), tryCatchWrapper(getUserStoriesController));


export { router as userRouter }