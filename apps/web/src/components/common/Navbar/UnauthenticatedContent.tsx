import PrimaryButton from "../PrimaryButton";
import SecondaryButton from "../SecondaryButton";

import styles from "./UnauthenticatedContent.module.css";


/**
 * component which contains login and register feature
 */
const UnauthenticatedContent = () => {
    return (
        <div className={styles.container}>
            <SecondaryButton children="Sign In" className={`${styles.login_button} ${styles.button}`} />
            <PrimaryButton children="Register Now" className={styles.button} />
        </div>
    );
}

export default UnauthenticatedContent;