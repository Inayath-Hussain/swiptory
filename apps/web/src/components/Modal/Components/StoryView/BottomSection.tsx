import { useState } from "react";

import BookmarkIcon from "@src/components/Icons/Bookmark";
import LikeButton from "./LikeButton";

import styles from "./BottomSection.module.css";


interface Iprops {
    story_id: string
    heading: string
    description: string
    category: string

    likes: number

    liked: boolean
}

const BottomSection: React.FC<Iprops> = ({ description, heading, likes, liked, story_id, category }) => {

    const [showMore, setShowMore] = useState(false);



    const handleShowMore = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.stopPropagation();

        setShowMore(prev => !prev)
    }




    const textClass = (className: string) => showMore ? `${className} ${styles.show_full}` : className

    const bookmarkColor = "#fff";


    return (
        <div className={styles.bottom_container} onClick={handleShowMore} >

            <h1 className={textClass(styles.heading)}>{heading}</h1>

            <p className={textClass(styles.description)}>{description}</p>


            <div className={styles.bottom_buttons_container}>


                <button>
                    <BookmarkIcon fill={bookmarkColor} className={styles.button_icon} />
                </button>



                <LikeButton category={category} liked={liked} likes={likes} story_id={story_id} />

            </div>

        </div>
    );
}

export default BottomSection;