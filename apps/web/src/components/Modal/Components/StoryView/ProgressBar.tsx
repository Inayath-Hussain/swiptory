import { useMemo } from "react";


import styles from "./ProgressBar.module.css";


interface Iprops {
    totalSlides: number
    currentIndex: number
    reachedEnd: boolean

    startAnimation: boolean
}

const ProgressBar: React.FC<Iprops> = ({ totalSlides, currentIndex, startAnimation, reachedEnd }) => {

    const getIndexes = () => {
        let indexes: number[] = []
        for (let i = 0; i < totalSlides; i++) {
            indexes.push(i);
        }

        return indexes;
    }


    const indexes = useMemo(getIndexes, [totalSlides]);


    const getProgressClass = (index: number) => {


        switch (true) {
            // add completed class to all slide progress bars if user visited the last slide
            case (reachedEnd):
                return styles.completed;


            // add animation class to the current slide progress bar 
            case (index === currentIndex && startAnimation):
                return styles.animate;


            // add completed class to all previous slides 
            case (index < currentIndex):
                return styles.completed;


            default:
                return ""
        }
    }


    return (
        <div className={styles.progress_bar_container}>
            {indexes.map((i) => (
                <div className={styles.slide_progress_container} key={i}>
                    <div className={`${styles.slide_progress} ${getProgressClass(i)}`} />
                </div>
            ))}
        </div>
    );
}

export default ProgressBar;