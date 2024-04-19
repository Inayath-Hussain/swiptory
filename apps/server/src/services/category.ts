import { Category, ICategory } from "../models/category";



interface GetCategoriesResult {
    categories: {
        name: string
        image: string
    }[]
}

class CategoryService {
    async addCategory(payload: ICategory) {
        const newDoc = new Category(payload)
        return await newDoc.save();
    }


    async getCategories() {
        const result = await Category.aggregate<GetCategoriesResult>([
            { $match: { name: { $exists: true } } },
            { $group: { _id: null, categories: { $push: { name: "$name", image: "$imageURL" } } } },
            { $project: { _id: 0 } }
        ])

        return result[0];
    }


    async getCategoryNames() {
        const result = await Category.aggregate<{ categories: string[] }>([
            { $match: { name: { $exists: true } } },
            { $group: { _id: null, categories: { $push: "$name" } } },
            { $project: { _id: 0 } }
        ])

        return result[0];
    }
}



export const categoryService = new CategoryService();