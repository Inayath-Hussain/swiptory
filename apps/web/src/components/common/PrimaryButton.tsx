import { PropsWithChildren } from "react";
import styles from "./PrimaryButton.module.css";



interface Iprops {
    className?: string
    handleClick?: () => void
    loading?: boolean
    disabled?: boolean
    title?: string

    type?: HTMLButtonElement["type"]
}

const PrimaryButton: React.FC<PropsWithChildren<Iprops>> = ({ className = "", children, type = "button", handleClick = () => { },
    loading = false, disabled = false, title = "" }) => {

    const additionalClass = loading ? styles.loading : disabled ? styles.disabled : "";

    return (
        <button className={`${styles.button} ${className} ${additionalClass}`} onClick={handleClick}
            type={type} disabled={loading || disabled} title={title} >
            {children}
        </button>
    );
}

export default PrimaryButton;