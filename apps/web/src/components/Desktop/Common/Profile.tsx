import { useContext, useRef, useState } from "react";
import Hamburger from "@src/assets/icons/hamburger.svg"

import PrimaryButton from "@src/components/common/PrimaryButton";
import useClose from "@src/hooks/useClose";
import { authTokenContext } from "@src/context/authTokens";

import styles from "./Profile.module.css";


interface Iprops {
    username: string
}


const ProfileButton: React.FC<Iprops> = ({ username }) => {
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
                        <p>{username}</p>

                        <PrimaryButton children="Logout" handleClick={logout} />
                    </div>
                    :
                    null
            }
        </div>
    );
}

export default ProfileButton;