
import ArrowIcon from "@src/assets/icons/arrow.svg";

import styles from "./DesktopControlButton.module.css";


interface Iprops {
    direction: "left" | "right"
    onClick: () => void
}


const DesktopControlButton: React.FC<Iprops> = ({ direction, onClick }) => {

    const arrowClass = `${styles.arrow} ${direction === "left" ? styles.left : styles.right}`;

    const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.stopPropagation();

        onClick();
    }

    return (
        <button onClick={handleClick} >
            <img src={ArrowIcon} alt="" className={arrowClass} />
        </button>
    );
}

export default DesktopControlButton;