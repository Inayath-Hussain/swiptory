
import BookmarkIcon from "@src/components/Icons/Bookmark";
import styles from "./BottomSection.module.css";
import LikeIcon from "@src/components/Icons/Like";
import { useState } from "react";


interface Iprops {
    heading: string
    description: string
}

const BottomSection: React.FC<Iprops> = ({ description, heading }) => {

    const [showMore, setShowMore] = useState(false);



    const handleShowMore = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.stopPropagation();

        setShowMore(prev => !prev)
    }


    const textClass = (className: string) => showMore ? `${className} ${styles.show_full}` : className

    const bookmarkColor = "#fff";

    const likeColor = "#fff";

    return (
        <div className={styles.bottom_container} onClick={handleShowMore} >

            <h1 className={textClass(styles.heading)}>{heading}</h1>

            <p className={textClass(styles.description)}>{description}</p>


            <div className={styles.bottom_buttons_container}>

                <button>
                    <BookmarkIcon fill={bookmarkColor} className={styles.button_icon} />
                </button>


                <button className={styles.like_button}>
                    <LikeIcon fill={likeColor} className={styles.button_icon} />
                    123
                </button>

            </div>

        </div>
    );
}

export default BottomSection;