import { PropsWithChildren } from "react";
import styles from "./GreenButton.module.css";


interface Iprops {
    className?: string
    handleClick?: () => void
    loading?: boolean
    disabled?: boolean
    title?: string

    type?: HTMLButtonElement["type"]
}


const GreenButton: React.FC<PropsWithChildren<Iprops>> = ({ className = "", disabled, loading, handleClick = () => { },
    type = "button", children, title = ""
}) => {

    const additionalClass = loading ? styles.loading : disabled ? styles.disabled : "";

    return (
        <button className={`${styles.button} ${className} ${additionalClass}`} onClick={handleClick}
            type={type} disabled={loading || disabled} title={title} >
            {children}
        </button>
    );
}

export default GreenButton;