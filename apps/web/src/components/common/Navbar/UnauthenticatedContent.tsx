import { Dispatch, SetStateAction } from "react";

import PrimaryButton from "../PrimaryButton";
import SecondaryButton from "../SecondaryButton";
import CloseIcon from "@src/assets/icons/close_icon.svg";
import AuthenticationForm from "@src/components/Modal/Forms/AuthenticationForm";
import useDeviceWidth from "@src/hooks/useDeviceWidth";
import useModal from "@src/hooks/useModal";

import styles from "./UnauthenticatedContent.module.css";


interface Iprops {
    setOpen: Dispatch<SetStateAction<boolean>>
}


/**
 * component which contains login and register feature
 */
const UnauthenticatedContent: React.FC<Iprops> = ({ setOpen }) => {

    const { isDesktop } = useDeviceWidth();
    const { ModalPortal: LoginModalPortal, showModal: showLoginModal, hideModal: hideLoginModal } = useModal();
    const { ModalPortal: RegisterModalPortal, showModal: showRegisterModal, hideModal: hideRegisterModal } = useModal();

    const closeNavbar = () => setOpen(false);

    return (
        <>
            {
                isDesktop ?
                    null
                    :
                    // closes navbar in mobile width devices
                    <button onClick={closeNavbar} className={styles.close_button}>
                        <img src={CloseIcon} alt="" className={styles.close_image} />
                    </button>
            }

            <div className={styles.container}>
                {/* login button */}
                <SecondaryButton children="Sign In" className={`${styles.login_button} ${styles.button}`} handleClick={showLoginModal} />
                {/* register button */}
                <PrimaryButton children="Register Now" className={styles.button} handleClick={showRegisterModal} />
            </div>

            {LoginModalPortal(<AuthenticationForm type="login" closeModal={hideLoginModal} />)}
            {RegisterModalPortal(<AuthenticationForm type="register" closeModal={hideRegisterModal} />)}

        </>
    );
}

export default UnauthenticatedContent;