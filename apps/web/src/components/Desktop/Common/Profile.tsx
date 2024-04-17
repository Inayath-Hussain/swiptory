import { useRef, useState } from "react";
import Hamburger from "@src/assets/icons/hamburger.svg"

import styles from "./Profile.module.css";
import PrimaryButton from "@src/components/common/PrimaryButton";
import useClose from "@src/hooks/useClose";


const ProfileButton = () => {

    const [open, setOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement | null>(null);

    useClose({ handleClose: () => setOpen(false), ref: containerRef })

    return (
        <div ref={containerRef}>
            <button onClick={() => setOpen(prev => !prev)}>
                <img src={Hamburger} alt="" />
            </button>

            {
                open ?
                    <div className={styles.container}>
                        <p>Your Name</p>

                        <PrimaryButton children="Logout" />
                    </div>
                    : null
            }
        </div>
    );
}

export default ProfileButton;