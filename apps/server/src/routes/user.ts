import { Router } from "express";
import { loginController } from "../controllers/user/login";
import { registerController } from "../controllers/user/register";
import { validateAuthRequestBody } from "../middlewares/user/validateAuthRequestBody";
import { tryCatchWrapper } from "../utilities/requestHandler/tryCatchWrapper";

const router = Router();


router.post("/login", validateAuthRequestBody, tryCatchWrapper(loginController));

router.post("/register", validateAuthRequestBody, tryCatchWrapper(registerController));



export { router as userRouter }