import styles from "./ErrorMessage.module.css";


interface Iprops {
    errorMessage: string

    className?: string
}


const ErrorMessage: React.FC<Iprops> = ({ errorMessage, className = "" }) => {
    return (
        <p className={`${styles.error} ${className}`}>{errorMessage}</p>
    );
}

export default ErrorMessage;