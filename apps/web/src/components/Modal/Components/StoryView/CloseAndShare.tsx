
import ShareIcon from "@src/assets/icons/share.svg";
import CloseIcon from "@src/components/Icons/Close";

import styles from "./CloseAndShare.module.css";


interface Iprops {
    close: () => void
    story_id: string
}

const CloseAndShare: React.FC<Iprops> = ({ close, story_id }) => {

    const handleShare = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.stopPropagation();

        await navigator.clipboard.writeText(window.location.origin + "/?story=" + story_id)

        // toast copied to clipboard
    }

    return (
        <div className={styles.top_buttons_container}>
            <button onClick={close}>
                <CloseIcon stroke="#fff" className={styles.close_button} />
            </button>

            <button onClick={handleShare}>
                <img src={ShareIcon} alt="" className={styles.share_button} />
            </button>
        </div>
    );
}

export default CloseAndShare;