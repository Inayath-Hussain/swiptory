import { Router } from "express";
import { userRouter } from "./user";
import { categoryRouter } from "./category";


const router = Router();

router.use("/user", userRouter);
router.use("/category", categoryRouter);


export { router as mainRouter }