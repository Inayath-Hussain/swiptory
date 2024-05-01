import styles from "./Loader.module.css";


const LoaderModal = () => {
    return (
        <div role="dialog" aria-modal="true" className={styles.modal_layout}>
            <span className={styles.loader}></span>
        </div>
    );
}

export default LoaderModal;