import { RequestHandler } from "express";
import { IAddCategoryBody } from "../../middlewares/category/validateAddCategoryBody";
import { categoryService } from "../../services/category";
import { tryCatchWrapper } from "../../utilities/requestHandler/tryCatchWrapper";

const controller: RequestHandler<{}, {}, IAddCategoryBody> = async (req, res, next) => {
    const { imageURL, name } = req.body;

    await categoryService.addCategory({ name, imageURL })

    return res.status(201).json({ message: "success" })
}



export const addCategoryController = tryCatchWrapper(controller);