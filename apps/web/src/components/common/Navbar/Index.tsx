import { useContext, useRef, useState } from "react";

import HamburgerIcon from "@src/assets/icons/hamburger.svg";

import useClose from "@src/hooks/useClose";
import useDeviceWidth from "@src/hooks/useDeviceWidth";


import styles from "./Index.module.css";
import { authTokenContext } from "@src/context/authTokens";
import AuthenticatedContent from "./AuthenticatedContent";
import UnauthenticatedContent from "./UnauthenticatedContent";
import { Link } from "react-router-dom";
import { routes } from "@src/routes";


const Navbar = () => {
    // state variable to open and close hamburger in mobile view
    const [open, setOpen] = useState(false);
    const navRef = useRef<HTMLElement | null>(null);
    const { isLoggedIn } = useContext(authTokenContext);
    const { isDesktop } = useDeviceWidth();

    // In mobile width devices, closes nav bar when clicked outside of it 
    useClose({ handleClose: () => setOpen(false), ref: navRef })


    const handleSandwichOpenStatus = () => setOpen(prev => !prev)

    return (
        <nav ref={navRef} className={`${styles.nav} ${open ? styles.shadow : styles.shadow}`}>

            <div className={styles.main_container}>

                <Link to={routes.home}>
                    <h1 className={styles.logo}>
                        SwipTory
                    </h1>
                </Link>


                {
                    // hamburger icon only for device's whose width less than 768px
                    isDesktop ? null :
                        <button onClick={handleSandwichOpenStatus}>
                            <img src={HamburgerIcon} alt="" className={styles.hamburger} />
                        </button>
                }

            </div>




            {
                (open || isDesktop) &&
                <div className={`${styles.secondary_container} ${isDesktop ? "" : styles.shadow}`}>

                    {
                        isLoggedIn ?
                            <AuthenticatedContent setOpen={setOpen} />
                            :
                            <UnauthenticatedContent setOpen={setOpen} />
                    }

                </div>
            }

        </nav>
    );
}

export default Navbar;