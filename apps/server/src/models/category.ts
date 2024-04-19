import { InferSchemaType, Schema, model } from "mongoose";

const categorySchema = new Schema({
    name: { type: String, required: true, index: true },
    imageURL: { type: String, required: true }
})



export type ICategory = InferSchemaType<typeof categorySchema>;

export const Category = model("category", categorySchema);