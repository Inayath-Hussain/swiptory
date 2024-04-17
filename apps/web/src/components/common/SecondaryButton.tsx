import { PropsWithChildren } from "react";
import styles from "./SecondaryButton.module.css";

interface Iprops {
    className?: string
}

const SecondaryButton: React.FC<PropsWithChildren<Iprops>> = ({ children, className = "" }) => {
    return (
        <button className={`${styles.button} ${className}`} >
            {children}
        </button>
    );
}

export default SecondaryButton;