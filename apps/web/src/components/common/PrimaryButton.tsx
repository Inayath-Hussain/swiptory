import { PropsWithChildren } from "react";
import styles from "./PrimaryButton.module.css";



interface Iprops {
    className?: string
}

const PrimaryButton: React.FC<PropsWithChildren<Iprops>> = ({ className = "", children }) => {
    return (
        <button className={`${styles.button} ${className}`}>
            {children}
        </button>
    );
}

export default PrimaryButton;