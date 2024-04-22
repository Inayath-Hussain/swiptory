
import styles from "./StoryCard.module.css";


interface Iprops {
    data: {
        image: string
        heading: string
        description: string
    }
}


const StoryCard: React.FC<Iprops> = ({ data }) => {
    return (
        <div className={styles.card_container}>
            <img src={data.image} alt="" className={styles.image} />

            <div className={styles.text_container}>
                <p className={styles.heading}>{data.heading}</p>
                <p className={styles.description}>{data.description}</p>
            </div>
        </div>
    );
}

export default StoryCard;