import { Dispatch, SetStateAction, useContext } from "react";
import { useSelector } from "react-redux";

import CloseIcon from "@src/assets/icons/close_icon.svg";

import PrimaryButton from "../PrimaryButton";
import ProfileButton from "@src/components/Desktop/Common/Profile";
import BookmarkIcon from "@src/components/Icons/Bookmark";
import StoryForm from "@src/components/Modal/Content/StoryForm";
import { authTokenContext } from "@src/context/authTokens";
import useDeviceWidth from "@src/hooks/useDeviceWidth";
import useModal from "@src/hooks/useModal";
import { userProfileSelector } from "@src/store/slices/userProfile";

import styles from "./AuthenticatedContent.module.css";
import { Link } from "react-router-dom";
import { routes } from "@src/routes";


interface Iprops {
    setOpen: Dispatch<SetStateAction<boolean>>
}

/**
 * component containing features and links to pages which are only available when user is logged in. 
 */
const AuthenticatedContent: React.FC<Iprops> = ({ setOpen }) => {

    const { isDesktop } = useDeviceWidth();
    const { logout } = useContext(authTokenContext);
    const { username, profilePicUrl } = useSelector(userProfileSelector);

    const { showModal, hideModal, ModalPortal } = useModal();

    const closeNavbar = () => setOpen(false)

    return (
        <>
            <div className={styles.profile_container}>
                <img src={profilePicUrl} alt="" className={styles.profile_image} />

                {isDesktop ? null : <p className={styles.name}>{username}</p>}

                {
                    isDesktop ?
                        <ProfileButton username={username} />
                        :
                        <button onClick={closeNavbar}>
                            <img src={CloseIcon} alt="" className={styles.hamburger} />
                        </button>
                }
            </div>


            {isDesktop ? null :
                <Link to={routes.yourStories} className={styles.link}>
                    <PrimaryButton children="Your Story" className={styles.button} />
                </Link>}


            <PrimaryButton children="Add story" className={styles.button} handleClick={showModal} />


            {/* bookmark link */}
            <Link to={routes.bookmark} className={styles.link}>
                <PrimaryButton className={`${styles.button} ${styles.bookmark_button}`}>
                    <BookmarkIcon width={25} height={25} /> Bookmarks
                </PrimaryButton>
            </Link>


            {isDesktop ? null : <PrimaryButton children="Logout" className={styles.button} handleClick={logout} />}

            {/* create story modal */}
            {ModalPortal(<StoryForm type="create" closeModal={hideModal} closeNavbar={closeNavbar} />)}

        </>
    );
}

export default AuthenticatedContent;