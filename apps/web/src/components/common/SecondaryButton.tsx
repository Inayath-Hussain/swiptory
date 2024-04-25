import { PropsWithChildren } from "react";
import styles from "./SecondaryButton.module.css";

interface Iprops {
    className?: string
    handleClick?: () => void
    loading?: boolean
    disabled?: boolean
    title?: string

    type?: HTMLButtonElement["type"]
}

const SecondaryButton: React.FC<PropsWithChildren<Iprops>> = ({ children, className = "", type = "button", disabled, loading, title = "",
    handleClick = () => { } }) => {

    const additionalClass = loading ? styles.loading : disabled ? styles.disabled : "";

    return (
        <button className={`${styles.button} ${className} ${additionalClass}`} onClick={handleClick}
            type={type} disabled={loading || disabled} title={title} >
            {children}
        </button>
    );
}

export default SecondaryButton;