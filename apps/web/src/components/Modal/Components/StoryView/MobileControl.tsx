import styles from "./MobileControl.module.css";


interface Iprops {
    moveToNextSlide: () => void
    moveToPreviousSlide: () => void
}

const MobileControl: React.FC<Iprops> = ({ moveToNextSlide, moveToPreviousSlide }) => {
    return (
        <div className={styles.mobile_slide_control_container}>
            <div className={styles.control} onClick={moveToPreviousSlide} />

            <div className={styles.control} onClick={moveToNextSlide} />
        </div>
    );
}

export default MobileControl;