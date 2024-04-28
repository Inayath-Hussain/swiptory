import { Router } from "express";

import { validateAddCategoryBody } from "../middlewares/category/validateAddCategoryBody";
import { addCategoryController } from "../controllers/category/addCategory";

import { getCategoriesController } from "../controllers/category/getCategories";
import { authMiddleware } from "../middlewares/auth/authMiddleware";


const router = Router();


router.post("/", authMiddleware, validateAddCategoryBody, addCategoryController);


router.get("/", getCategoriesController);


export { router as categoryRouter }