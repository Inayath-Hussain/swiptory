import { RequestHandler } from "express";
import { categoryService } from "../../services/category";

export const getCategoriesController: RequestHandler = async (req, res, next) => {
    const result = await categoryService.getCategories()

    return res.status(200).json(result)
}