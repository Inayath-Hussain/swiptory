import { Router } from "express";
import { loginController } from "../controllers/user/login";
import { registerController } from "../controllers/user/register";
import { validateAuthRequestBody } from "../middlewares/user/validateAuthRequestBody";
import { tryCatchWrapper } from "../utilities/requestHandler/tryCatchWrapper";
import { authMiddleware } from "../middlewares/auth/authMiddleware";
import { getUserInfoController } from "../controllers/user/info";

const router = Router();


router.post("/login", validateAuthRequestBody, tryCatchWrapper(loginController));

router.post("/register", validateAuthRequestBody, tryCatchWrapper(registerController));

router.get("/info", tryCatchWrapper(authMiddleware), tryCatchWrapper(getUserInfoController))


export { router as userRouter }