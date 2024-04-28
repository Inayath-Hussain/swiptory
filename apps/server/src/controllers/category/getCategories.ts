import { RequestHandler } from "express";
import { categoryService } from "../../services/category";
import { tryCatchWrapper } from "../../utilities/requestHandler/tryCatchWrapper";

const controller: RequestHandler = async (req, res, next) => {
    const result = await categoryService.getCategories()

    return res.status(200).json(result)
}



export const getCategoriesController = tryCatchWrapper(controller);