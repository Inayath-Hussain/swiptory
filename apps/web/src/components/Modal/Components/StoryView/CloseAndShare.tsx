import ShareIcon from "@src/assets/icons/share.svg";
import CloseIcon from "@src/components/Icons/Close";

import styles from "./CloseAndShare.module.css";
import { useEffect, useRef, useState } from "react";


interface Iprops {
    close: () => void
    story_id: string
}

const CloseAndShare: React.FC<Iprops> = ({ close, story_id }) => {

    const [toastMessage, setToastMessage] = useState("");

    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {

        if (toastMessage !== "") {
            timeoutRef.current = setTimeout(() => {
                setToastMessage("")
            }, 3000)
        }

        return () => {
            timeoutRef.current && clearTimeout(timeoutRef.current)
        }
    }, [toastMessage])

    const handleShare = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.stopPropagation();

        await navigator.clipboard.writeText(window.location.origin + "/?story=" + story_id);
        setToastMessage("Link copied to clipboard");
    }

    return (
        <div className={styles.top_buttons_container}>
            <button onClick={close}>
                <CloseIcon stroke="#fff" className={styles.close_button} />
            </button>

            <button onClick={handleShare}>
                <img src={ShareIcon} alt="" className={styles.share_button} />
            </button>


            {
                toastMessage &&
                <div className={styles.toast_container}>
                    <p className={styles.toast}>{toastMessage}</p>
                </div>
            }
        </div>
    );
}

export default CloseAndShare;