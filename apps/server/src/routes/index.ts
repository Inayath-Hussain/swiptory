import { Router } from "express";

import { userRouter } from "./user";
import { categoryRouter } from "./category";
import { storyRouter } from "./story";


const router = Router();

router.use("/user", userRouter);
router.use("/category", categoryRouter);
router.use("/story", storyRouter);


export { router as mainRouter }