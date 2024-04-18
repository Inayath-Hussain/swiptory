import { PropsWithChildren } from "react";
import styles from "./SecondaryButton.module.css";

interface Iprops {
    className?: string
    handleClick?: () => void

    type?: HTMLButtonElement["type"]
}

const SecondaryButton: React.FC<PropsWithChildren<Iprops>> = ({ children, className = "", type = "button", handleClick = () => { } }) => {
    return (
        <button className={`${styles.button} ${className}`} onClick={handleClick} type={type}>
            {children}
        </button>
    );
}

export default SecondaryButton;