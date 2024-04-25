import { Dispatch, SetStateAction, useContext } from "react";

import CloseIcon from "@src/assets/icons/close_icon.svg";
import ProfilePic from "@src/assets/images/default profile picture.png";

import PrimaryButton from "../PrimaryButton";
import ProfileButton from "@src/components/Desktop/Common/Profile";
import BookmarkIcon from "@src/components/Icons/Bookmark";
import StoryForm from "@src/components/Modal/Forms/StoryForm";
import { authTokenContext } from "@src/context/authTokens";
import useDeviceWidth from "@src/hooks/useDeviceWidth";
import useModal from "@src/hooks/useModal";

import styles from "./AuthenticatedContent.module.css";


interface Iprops {
    setOpen: Dispatch<SetStateAction<boolean>>
}

/**
 * component containing features and links to pages which are only available when user is logged in. 
 */
const AuthenticatedContent: React.FC<Iprops> = ({ setOpen }) => {

    const { isDesktop } = useDeviceWidth();
    const { logout } = useContext(authTokenContext);

    const { showModal, hideModal, ModalPortal } = useModal();

    const closeNavbar = () => setOpen(false)

    return (
        <>
            <div className={styles.profile_container}>
                <img src={ProfilePic} alt="" className={styles.profile_image} />

                {isDesktop ? null : <p className={styles.name}>Your Name</p>}

                {
                    isDesktop ?
                        <ProfileButton />
                        :
                        <button onClick={closeNavbar}>
                            <img src={CloseIcon} alt="" className={styles.hamburger} />
                        </button>
                }
            </div>


            {isDesktop ? null : <PrimaryButton children="Your Story" className={styles.button} />}

            <PrimaryButton children="Add story" className={styles.button} handleClick={showModal} />

            <PrimaryButton className={`${styles.button} ${styles.bookmark_button}`}>
                <BookmarkIcon width={25} height={25} /> Bookmarks
            </PrimaryButton>


            {isDesktop ? null : <PrimaryButton children="Logout" className={styles.button} handleClick={logout} />}

            {/* create story modal */}
            {ModalPortal(<StoryForm type="create" closeModal={hideModal} closeNavbar={closeNavbar} />)}

        </>
    );
}

export default AuthenticatedContent;