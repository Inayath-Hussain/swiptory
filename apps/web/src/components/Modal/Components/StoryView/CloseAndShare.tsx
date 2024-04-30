
import ShareIcon from "@src/assets/icons/share.svg";
import CloseIcon from "@src/components/Icons/Close";

import styles from "./CloseAndShare.module.css";


interface Iprops {
    close: () => void
}

const CloseAndShare: React.FC<Iprops> = ({ close }) => {
    return (
        <div className={styles.top_buttons_container}>
            <button onClick={close}>
                <CloseIcon stroke="#fff" className={styles.close_button} />
            </button>

            <button>
                <img src={ShareIcon} alt="" className={styles.share_button} />
            </button>
        </div>
    );
}

export default CloseAndShare;