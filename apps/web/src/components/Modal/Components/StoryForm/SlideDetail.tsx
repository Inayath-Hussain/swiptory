
import { useSelector } from "react-redux";
import styles from "./SlideDetail.module.css";
import { categoriesSelector } from "@src/store/slices/categories";
import { Dispatch, SetStateAction } from "react";
import { StoryFormData } from "../../Forms/StoryForm";


interface Iprops {
    data: StoryFormData
    setData: Dispatch<SetStateAction<StoryFormData>>

    selectedIndex: number
}

const SlideDetail: React.FC<Iprops> = ({ data, setData, selectedIndex }) => {

    const { categories } = useSelector(categoriesSelector);

    const handleSlideDetailChange = (key: keyof StoryFormData["slides"][number], e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
        setData(prev => {
            prev.slides[selectedIndex][key] = e.target.value
            const newValue = { ...prev }
            return newValue
        })

    return (
        <div className={styles.slide_detail}>

            {/* heading */}
            <div className={styles.label_and_input_container}>
                <label className={styles.label} htmlFor="heading">Heading</label>
                <input type="text" id="heading" className={styles.text_input} placeholder="Your heading"
                    value={data.slides[selectedIndex].heading} onChange={(e) => handleSlideDetailChange("heading", e)} />
            </div>



            {/* description */}
            <div className={styles.label_and_input_container}>
                <label className={styles.label} htmlFor="description">Description</label>
                <textarea id="description" rows={5} className={styles.text_area} placeholder="Story Description"
                    value={data.slides[selectedIndex].description} onChange={(e) => handleSlideDetailChange("description", e)} />
            </div>



            {/* image */}
            <div className={styles.label_and_input_container}>
                <label className={styles.label} htmlFor="image">Image</label>
                <input type="text" id="image" className={styles.text_input} placeholder="Add Image url"
                    value={data.slides[selectedIndex].image} onChange={e => handleSlideDetailChange("image", e)} />
            </div>


            {/* category */}
            <div className={styles.label_and_input_container}>

                <label className={styles.label} htmlFor="category">Category</label>

                <select id="category" className={styles.select}
                    value={data.category} onChange={e => setData(prev => ({ ...prev, category: e.target.value }))} >
                    <option value="" hidden disabled>Select Category</option>

                    {categories.map(c => (
                        <option key={c.name} value={c.name}>{c.displayText}</option>
                    ))}

                </select>
            </div>


        </div>
    );
}

export default SlideDetail;