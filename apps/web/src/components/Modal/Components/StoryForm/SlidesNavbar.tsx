
import CloseCircleButton from "@src/components/common/CloseCircleButton";
import { StoryFormData } from "../../Forms/StoryForm";

import styles from "./SlidesNavbar.module.css";


interface Iprops {
    selectedIndex: number

    data: StoryFormData
    handleChangeSlide: (id: string) => void
    addNewSlide: () => void
    removeSlide: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, id: string, slideIndex: number) => void
}

const SlidesNavbar: React.FC<Iprops> = ({ addNewSlide, data, handleChangeSlide, selectedIndex, removeSlide }) => {
    return (
        <div className={styles.slides_nav}>
            {data.slides.map((d, index) => (

                <div key={d._id} className={`${styles.slides_nav_button} ${index === selectedIndex ? styles.active : ""}`}
                    onClick={() => handleChangeSlide(d._id)} >
                    Slide {index + 1}

                    {
                        index > 2 ?
                            <CloseCircleButton handleClick={(e) => removeSlide(e, d._id, index)}
                                buttonClassName={styles.slide_delete_button}
                                imageClassName={styles.slide_delete_image}
                            />
                            :
                            null
                    }

                </div>
            ))}

            {/* add slide button */}
            {data.slides.length < 6 ?
                <div className={styles.slides_nav_button} onClick={addNewSlide}>
                    Add +
                </div>
                :
                null
            }

        </div>
    );
}

export default SlidesNavbar;