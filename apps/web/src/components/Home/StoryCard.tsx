import Coffee from "@src/assets/images/coffee.png";
import Food from "@src/assets/images/food.jpg";

import styles from "./StoryCard.module.css";


const StoryCard = () => {
    return (
        <>
            <div className={styles.card_container}>
                <img src={Coffee} alt="" className={styles.image} />

                <div className={styles.text_container}>
                    <p className={styles.heading}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam porro nobis assumenda repellendus numquam neque blanditiis ut at dolores omnis, odit ducimus id eaque in eos reiciendis distinctio eum! Nihil!</p>
                    <p className={styles.description}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi facilis, eligendi ea tempora nam sed minima itaque ut nemo aliquam. Fugiat magnam obcaecati modi voluptatibus. Est, aliquam esse! Minus, nisi.</p>
                </div>
            </div>


            <div className={styles.card_container}>
                <img src={Food} alt="" className={styles.image} />

                <div className={styles.text_container}>
                    <p className={styles.heading}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam porro nobis assumenda repellendus numquam neque blanditiis ut at dolores omnis, odit ducimus id eaque in eos reiciendis distinctio eum! Nihil!</p>
                    <p className={styles.description}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi facilis, eligendi ea tempora nam sed minima itaque ut nemo aliquam. Fugiat magnam obcaecati modi voluptatibus. Est, aliquam esse! Minus, nisi.</p>
                </div>
            </div>
        </>
    );
}

export default StoryCard;