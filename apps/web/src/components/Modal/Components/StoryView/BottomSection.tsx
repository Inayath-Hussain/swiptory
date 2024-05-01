import { useState } from "react";

import LikeButton from "./LikeButton";
import BookmarkButton from "./BookmarkButton";

import styles from "./BottomSection.module.css";


interface Iprops {
    story_id: string
    heading: string
    description: string
    category: string

    showLoginForm: () => void
    likes: number
}

const BottomSection: React.FC<Iprops> = ({ description, heading, likes, story_id, category, showLoginForm }) => {

    const [showMore, setShowMore] = useState(false);



    const handleShowMore = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.stopPropagation();

        setShowMore(prev => !prev)
    }




    const textClass = (className: string) => showMore ? `${className} ${styles.show_full}` : className;


    return (
        <div className={styles.bottom_container} onClick={handleShowMore} >

            <h1 className={textClass(styles.heading)}>{heading}</h1>

            <p className={textClass(styles.description)}>{description}</p>


            <div className={styles.bottom_buttons_container}>


                <BookmarkButton story_id={story_id} showLoginForm={showLoginForm} />


                <LikeButton category={category} likes={likes} story_id={story_id} showLoginForm={showLoginForm} />

            </div>

        </div>
    );
}

export default BottomSection;