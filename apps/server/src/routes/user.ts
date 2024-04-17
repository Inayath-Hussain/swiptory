import { Router } from "express";
import { loginController } from "../controllers/user/login";
import { registerController } from "../controllers/user/register";
import { validateAuthRequestBody } from "../middlewares/user/validateAuthRequestBody";

const router = Router();


router.post("/login", validateAuthRequestBody, loginController);

router.post("/register", validateAuthRequestBody, registerController);



export { router as userRouter }