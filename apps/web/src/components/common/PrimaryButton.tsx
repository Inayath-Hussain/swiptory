import { PropsWithChildren } from "react";
import styles from "./PrimaryButton.module.css";



interface Iprops {
    className?: string
    handleClick?: () => void

    type?: HTMLButtonElement["type"]
}

const PrimaryButton: React.FC<PropsWithChildren<Iprops>> = ({ className = "", children, type = "button", handleClick = () => { } }) => {
    return (
        <button className={`${styles.button} ${className}`} onClick={handleClick} type={type} >
            {children}
        </button>
    );
}

export default PrimaryButton;