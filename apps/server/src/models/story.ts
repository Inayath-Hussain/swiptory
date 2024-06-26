import { InferSchemaType, Schema, model } from "mongoose";
import { slidesValidator } from "../middlewares/story/validator";


const slideSchema = new Schema({
    heading: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
});



const storySchema = new Schema({
    created_by: { type: Schema.Types.ObjectId, required: true },

    category: { type: String, required: true },

    slides: {
        type: [slideSchema],
        validate: [{
            validator: minSlidesLengthValidator,
            message: "Atleast 3 slides are required"
        },
        {
            validator: maxSlidesLengthValidator,
            message: "Maximum of 6 slides are allowed"
        }]
    },

    likes: { type: Number, required: true, default: 0, min: 0 }
}, { timestamps: true });

// validator function to check if slides array has atleast 3 items
function minSlidesLengthValidator(value: typeof slideSchema[]) {
    return value.length >= 3;
}



// validator function to check if slides array doesnot exceed 6 items
function maxSlidesLengthValidator(value: typeof slideSchema[]) {
    return value.length < 6;
}







export type IStory = Omit<InferSchemaType<typeof storySchema>, "slides"> & { slides: InferSchemaType<typeof slidesValidator> }


export const Story = model("story", storySchema);