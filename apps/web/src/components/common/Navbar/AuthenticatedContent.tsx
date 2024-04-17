import { Dispatch, SetStateAction } from "react";

import CloseIcon from "@src/assets/icons/close_icon.svg";
import ProfilePic from "@src/assets/images/default profile picture.png";

import PrimaryButton from "../PrimaryButton";
import ProfileButton from "@src/components/Desktop/Common/Profile";
import BookmarkIcon from "@src/components/Icons/Bookmark";
import useDeviceWidth from "@src/hooks/useDeviceWidth";

import styles from "./AuthenticatedContent.module.css";


interface Iprops {
    setOpen: Dispatch<SetStateAction<boolean>>
}

/**
 * component containing features and links to pages which are only available when user is logged in. 
 */
const AuthenticatedContent: React.FC<Iprops> = ({ setOpen }) => {

    const { isDesktop } = useDeviceWidth();

    return (
        <>
            <div className={styles.profile_container}>
                <img src={ProfilePic} alt="" className={styles.profile_image} />

                {isDesktop ? null : <p className={styles.name}>Your Name</p>}

                {
                    isDesktop ?
                        <ProfileButton />
                        :
                        <button onClick={() => setOpen(false)}>
                            <img src={CloseIcon} alt="" className={styles.hamburger} />
                        </button>
                }
            </div>


            {isDesktop ? null : <PrimaryButton children="Your Story" className={styles.button} />}

            <PrimaryButton children="Add story" className={styles.button} />

            <PrimaryButton className={`${styles.button} ${styles.bookmark_button}`}>
                <BookmarkIcon width={25} height={25} /> Bookmarks
            </PrimaryButton>


            {isDesktop ? null : <PrimaryButton children="Logout" className={styles.button} />}
        </>
    );
}

export default AuthenticatedContent;