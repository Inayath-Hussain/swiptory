import { useContext, useRef, useState } from "react";
import Hamburger from "@src/assets/icons/hamburger.svg"

import styles from "./Profile.module.css";
import PrimaryButton from "@src/components/common/PrimaryButton";
import useClose from "@src/hooks/useClose";
import { authTokenContext } from "@src/context/authTokens";


const ProfileButton = () => {
    const [open, setOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement | null>(null);
    const { logout } = useContext(authTokenContext);

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

                        <PrimaryButton children="Logout" handleClick={logout} />
                    </div>
                    : null
            }
        </div>
    );
}

export default ProfileButton;