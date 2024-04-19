import { Router } from "express";

import { validateAddCategoryBody } from "../middlewares/category/validateAddCategoryBody";
import { addCategoryController } from "../controllers/category/addCategory";

import { tryCatchWrapper } from "../utilities/requestHandler/tryCatchWrapper";
import { getCategoriesController } from "../controllers/category/getCategories";


const router = Router();


router.post("/", validateAddCategoryBody, tryCatchWrapper(addCategoryController));


router.get("/", tryCatchWrapper(getCategoriesController));


export { router as categoryRouter }