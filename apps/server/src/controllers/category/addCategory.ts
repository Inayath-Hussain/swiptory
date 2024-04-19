import { RequestHandler } from "express";
import { IAddCategoryBody } from "../../middlewares/category/validateAddCategoryBody";
import { categoryService } from "../../services/category";

export const addCategoryController: RequestHandler<{}, {}, IAddCategoryBody> = async (req, res, next) => {
    const { imageURL, name } = req.body;

    await categoryService.addCategory({ name, imageURL })

    return res.status(201).json({ message: "success" })
}